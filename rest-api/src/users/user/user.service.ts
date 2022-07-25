import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.interface';
import { v4 } from 'uuid';
import { updateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    private usersBase: User[] = [];

    getAll() {
        return this.usersBase.filter((user) => {
            return !user.isDeleted;
        });
    }

    private findUser(id: string) {
        const searchUser = this.usersBase.find((user) => {
            return user.id === id && !user.isDeleted;
        });
        if (searchUser) {
            return searchUser;
        } else {
            throw new NotFoundException('User not found');
        }
    }

    getAutoSuggestUsers(loginSubstring: string = '', limit?: number) {
        if (!limit || limit < 1) {
            limit = this.usersBase.length;
        }
        if (loginSubstring || limit) {
            return this.usersBase
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
        return this.findUser(id);
    }

    createUser(user: CreateUserDto) {
        let id: string = v4();
        this.usersBase.push({ id: id, isDeleted: false, ...user });
        return { id: id, isDeleted: false, ...user };
    }

    updateUser(id: string, userData: updateUserDto) {
        let updUser: User = this.findUser(id);
        if (updUser) {
            updUser.login = userData.login;
            updUser.password = userData.password;
            updUser.age = userData.age;
        }
        return updUser;
    }

    removeUser(id: string) {
        let delitedUser: User = this.findUser(id);
        if (delitedUser) {
            delitedUser.isDeleted = true;
        }
        return delitedUser;
    }
}
