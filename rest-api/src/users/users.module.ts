import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InMemoryUsersRepository } from './repository/in-memory.users.repository';
import { PostgresRepository } from './repository/postgres.users.repository';
import { UserController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: [UsersService, InMemoryUsersRepository, PostgresRepository],
})
export class UsersModule {}
