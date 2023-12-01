import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return await this.repo.save(user);
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async findAllUsers(email: string) {
    return await this.repo.find({ where: { email } });
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    Object.assign(user, attrs);
    // run the hooks
    return this.repo.save(user);
    // The `update()` and `insert()` method works with objects and it doesn't run the entity hooks
    // return await this.repo.update(id, attrs);
  }

  async removeUser(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    // run the hooks
    return this.repo.remove(user);
    // The `delete()` method works with objects and it doesn't run the entity hooks
    // return await this.repo.remove(id);
  }
}
