import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entity/auth.entity';
import { JwtAuthService } from './jwt/jwt.service';
import * as bcrypt from 'bcryptjs';
import { ConflictException } from '@nestjs/common';

// Mock Auth entity
class MockAuth extends Auth {}

// Mock Auth repository
const mockAuthRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

// Mock JwtAuthService
const mockJwtAuthService = {
  generateToken: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: Repository<Auth>;
  let jwtAuthService: JwtAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(Auth), useValue: mockAuthRepository },
        { provide: JwtAuthService, useValue: mockJwtAuthService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get<Repository<Auth>>(getRepositoryToken(Auth));
    jwtAuthService = module.get<JwtAuthService>(JwtAuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto = {
        username: 'testuser',
        password: 'testpassword',
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        role: 'user',
      };

      const expectedAuth = new MockAuth();
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword');
      mockAuthRepository.save.mockResolvedValue(expectedAuth);

      const result = await service.register(createUserDto);

      expect(result).toEqual(expectedAuth);
      expect(mockAuthRepository.save).toHaveBeenCalledWith(expect.any(MockAuth));
    });

    it('should throw ConflictException if username is already taken', async () => {
      const createUserDto = {
        username: 'existinguser',
        password: 'testpassword',
        name: 'Existing User',
        email: 'existing@example.com',
        phone: '1234567890',
        role: 'user',
      };

      mockAuthRepository.save.mockRejectedValue({ code: '23505' });

      await expect(service.register(createUserDto)).rejects.toThrowError(ConflictException);
    });
  });

  describe('login', () => {
    it('should login an existing user with correct credentials', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const user = new MockAuth();
      user.password = 'hashedPassword'; // bcrypt hash of 'testpassword'
      const token = 'testToken';

      mockAuthRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      mockJwtAuthService.generateToken.mockResolvedValue(token);

      const result = await service.login(username, password);

      expect(result).toEqual({ user, token });
    });

    it('should return error if user does not exist', async () => {
      const username = 'nonexistentuser';
      const password = 'testpassword';

      mockAuthRepository.findOne.mockResolvedValue(null);

      const result = await service.login(username, password);

      expect(result).toEqual({ error: 'User not found' });
    });

    it('should return error if password is incorrect', async () => {
      const username = 'testuser';
      const password = 'incorrectpassword';
      const user = new MockAuth();
      user.password = 'hashedPassword'; // bcrypt hash of 'testpassword'

      mockAuthRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await service.login(username, password);

      expect(result).toEqual({ error: 'Invalid password' });
    });
  });

  describe('updateUser', () => {
    it('should update user information', async () => {
      const username = 'testuser';
      const updateUserDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '9876543210',
        role: 'admin',
      };
      const user = new MockAuth();
      user.name = 'Old Name';
      user.email = 'old@example.com';
      user.phone = '1234567890';
      user.role = 'user';

      mockAuthRepository.findOne.mockResolvedValue(user);
      mockAuthRepository.save.mockResolvedValue(user);

      const result = await service.updateUser(username, updateUserDto);

      expect(result.message).toBe('User updated successfully');
      expect(result.user).toEqual(expect.objectContaining(updateUserDto));
      expect(mockAuthRepository.save).toHaveBeenCalledWith(user);
    });

    it('should return message "User not found" if user does not exist', async () => {
      const username = 'nonexistentuser';
      const updateUserDto = {
        name: 'Updated Name',
      };

      mockAuthRepository.findOne.mockResolvedValue(null);

      const result = await service.updateUser(username, updateUserDto);

      expect(result.message).toBe('User not found');
      expect(result.user).toBeNull();
    });
  });
});
