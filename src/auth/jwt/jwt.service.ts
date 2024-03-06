import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import{ Auth } from '../entity/auth.entity';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: Auth): Promise<string> {
    const payload = { username: user.username, email: user.email, role: user.role};
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new Error('Token is not valid');
    }
  }
}
