import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'crypto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(createUserDto: CreateUserDto) {
    const userExists = this.userService.userExists(createUserDto.email);
    if (userExists)
      throw new ConflictException('User with Email already Exists');

    const hashedPassword = hash('sha32', createUserDto.password, 'hex');
    createUserDto.password = hashedPassword;

    return this.create(createUserDto);
  }

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Invalid Email or Password',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // Check Password Hash

    // Generate JWT Token
    const token = '';
    // Send Token to Client
    return { user, token };
  }

  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
