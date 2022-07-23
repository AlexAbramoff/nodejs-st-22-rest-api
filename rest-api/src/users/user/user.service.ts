import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.interface';
import { v4 } from 'uuid';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    private usersBase: User[] = [];

    getAll() {
        return this.usersBase.filter((user) => {
            return !user.isDeleted;
        });
    }

    getAutoSuggestUsers(loginSubstring = '', limit?: number) {
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
        return this.usersBase.find((user) => {
            return user.id === id && !user.isDeleted;
        });
    }

    checkUserExist(login: string): boolean {
        if (
            this.usersBase.find((user) => {
                return user.login === login;
            })
        ) {
            return true;
        }
        return false;
    }

    createUser(user: CreateUserDto) {
        const id: string = v4();
        this.usersBase.push({ id: id, isDeleted: false, ...user });
        return { id: id, isDeleted: false, ...user };
    }

    updateUser(id: string, userData: UpdateUserDto) {
        const updUser: User = this.usersBase.find((user) => {
            return user.id === id && !user.isDeleted;
        });
        if (updUser) {
            updUser.login = userData.login;
            updUser.password = userData.password;
            updUser.age = userData.age;
            return updUser;
        } else {
            return 'User not found';
        }
    }

    removeUser(id: string) {
        const delitedUser: User = this.usersBase.find((user) => {
            return user.id === id && !user.isDeleted;
        });
        if (delitedUser) {
            delitedUser.isDeleted = true;
            return delitedUser;
        } else {
            return 'User not found';
        }
    }
}
