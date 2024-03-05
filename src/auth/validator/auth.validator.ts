// import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

// @ValidatorConstraint({ name: 'isStrongPassword', async: false })
// export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
//     validate(password: string, args: ValidationArguments) {
//         // Password must contain at least one number, one lowercase letter, one uppercase letter, one symbol, and have a minimum length of 8 characters
//         const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~\-=`{}[\]:";'<>?,.\/])(?=.*[a-zA-Z]).{8,}$/;
//         return regex.test(password);
//     }

//     defaultMessage(args: ValidationArguments) {
//         return 'Password must contain at least one number, one lowercase letter, one uppercase letter, one symbol, and have a minimum length of 8 characters';
//     }
// }
