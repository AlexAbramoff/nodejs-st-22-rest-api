import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.interface';
import { v4 } from 'uuid';
import { updateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    private usersBase: User[] = [
        {
            id: '551a0256-8482-454c-9776-704b7b29af4d',
            isDeleted: false,
            login: 'alex',
            password: 'pass',
            age: 20,
        },
        {
            id: '035d728a-5667-440e-acad-94cc8cdf2568',
            isDeleted: false,
            login: 'alex',
            password: 'pass',
            age: 20,
        },
        {
            id: 'a2b0ec3a-2435-40ab-8f0d-fefad6380bb5',
            isDeleted: false,
            login: 'abfgd',
            password: 'pass',
            age: 20,
        },
        {
            id: '4f30f2db-703a-4f93-9440-f32463666d29',
            isDeleted: false,
            login: 'acfgd',
            password: 'pass',
            age: 20,
        },
        {
            id: 'b50bd4b6-d8d0-4b80-a813-534152688e50',
            isDeleted: false,
            login: 'ahfgd',
            password: 'pass',
            age: 20,
        },
        {
            id: 'ccb06a0a-6948-496a-9894-4e6c81b00a23',
            isDeleted: false,
            login: 'agfgd',
            password: 'pass',
            age: 20,
        },
        {
            id: 'cda06f72-85f8-4bbb-9209-94250ea85202',
            isDeleted: true,
            login: 'aafgd',
            password: 'pass',
            age: 20,
        },
    ];

    getAll() {
        return this.usersBase.filter((user) => {
            return !user.isDeleted;
        });
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
        return this.usersBase.find((user) => {
            return user.id === id && !user.isDeleted;
        });
    }

    createUser(user: CreateUserDto) {
        let id: string = v4();
        this.usersBase.push({ id: id, isDeleted: false, ...user });
        return { id: id, isDeleted: false, ...user };
    }

    updateUser(id: string, userData: updateUserDto) {
        let updUser: User = this.usersBase.find((user) => {
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
        let delitedUser: User = this.usersBase.find((user) => {
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
