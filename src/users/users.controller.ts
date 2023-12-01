import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    try {
      const entity = await this.usersService.createUser(email, password);
      return entity;
    } catch (error) {
      return { message: `failed to save the user ${error}` };
    }
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const userId = Number(id);
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.findAllUsers(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const userId = Number(id);
    return await this.usersService.removeUser(userId);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const userId = Number(id);
    return await this.usersService.updateUser(userId, body);
  }
}
