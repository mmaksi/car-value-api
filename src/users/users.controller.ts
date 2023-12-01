import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    try {
      this.usersService.createUser(email, password);
      return body;
    } catch (error) {
      return { message: `failed to save the user ${error}` };
    }
  }
}
