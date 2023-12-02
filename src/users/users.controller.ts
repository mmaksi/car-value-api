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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.intercept';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return await this.authService.signup(email, password);
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return await this.authService.signin(email, password);
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
    return await this.usersService.find(email);
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
