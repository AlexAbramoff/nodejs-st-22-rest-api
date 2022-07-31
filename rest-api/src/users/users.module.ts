import { Module } from '@nestjs/common';
import { InMemoryUsersRepository } from './repository/in-memory.users.repository';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UserController],
    providers: [UsersService, InMemoryUsersRepository],
})
export class UsersModule {}
