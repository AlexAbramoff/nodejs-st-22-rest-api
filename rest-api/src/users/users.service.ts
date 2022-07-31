import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryUsersRepository } from './repository/in-memory.users.repository';

@Injectable()
export class UsersService {
    constructor(private inMemRep: InMemoryUsersRepository) {}

    getAll() {
        return this.inMemRep.findAll();
    }

    getAutoSuggestUsers(loginSubstring: string = '', limit?: number) {
        if (!limit || limit < 1) {
            limit = this.inMemRep.findAll().length;
        }
        if (loginSubstring || limit) {
            return this.inMemRep
                .findAll()
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

    getById(id: string) {
        return this.inMemRep.findById(id);
    }

    checkUserExist(login: string): boolean {
        if (
            this.inMemRep.findAll().find((user) => {
                return user.login === login;
            })
        ) {
            return true;
        }
        return false;
    }

    createUser(user: CreateUserDto) {
        if (this.checkUserExist(user.login)) {
            return false;
        }
        return this.inMemRep.create(user);
    }

    updateUser(id: string, userData: UpdateUserDto) {
        if (this.checkUserExist(userData.login)) {
            return false;
        }
        return this.inMemRep.update(id, userData);
    }

    removeUser(id: string) {
        return this.inMemRep.delete(id);
    }
}
