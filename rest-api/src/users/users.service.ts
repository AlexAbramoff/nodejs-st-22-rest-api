import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { PostgresRepository } from './repository/postgres.users.repository';

@Injectable()
export class UsersService {
    constructor(private usersRep: PostgresRepository) {}

    async getAll(loginSubstring: string = '', limit?: number) {
        const users = await this.usersRep.findAll();
        if (!limit || limit < 1) {
            limit = users.length;
        }
        if (loginSubstring || limit) {
            return users
                .filter((user) => {
                    return (
                        user.login.includes(loginSubstring) && !user.isDeleted
                    );
                })
                .sort((a, b) => {
                    if (a.login.toLowerCase() < b.login.toLowerCase()) {
                        return -1;
                    }
                    if (a.login.toLowerCase() > b.login.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
                .slice(0, limit);
        } else {
            return this.getAll();
        }
    }

    async getById(id: string) {
        const user = this.usersRep.findById(id);
        return user;
    }

    async checkUserExist(login: string) {
        const users = await this.usersRep.findAll();
        if (
            users.find((user) => {
                return user.login === login;
            })
        ) {
            return true;
        } else {
            return false;
        }
    }

    async createUser(userDto: CreateUserDto) {
        const id = v4();
        const userModel = { id, ...userDto };
        const user = await this.usersRep.create(userModel);
        return user;
    }

    async updateUser(id: string, userData: UpdateUserDto) {
        return this.usersRep.update(id, userData);
    }

    async removeUser(id: string) {
        const user = await this.getById(id);
        if (user) {
            return await this.usersRep.delete(id);
        } else {
            return null;
        }
    }
}
