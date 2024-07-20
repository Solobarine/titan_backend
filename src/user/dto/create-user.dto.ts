import {
  isEmail,
  isString,
  isNumber,
  Length,
  isNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @Length(3, 100)
  firstName: string;

  @Length(3, 100)
  lastName: string;

  email: string;

  password: string;
}
