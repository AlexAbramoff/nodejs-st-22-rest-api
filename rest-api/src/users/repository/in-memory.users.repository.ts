import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../user.entity';
import { v4 } from 'uuid';
import { UsersRepository } from './users.repository';

@Injectable()
class InMemoryUsersRepository implements UsersRepository {
    private usersBase: User[] = [];
    findById(id: string) {
        return this.usersBase.find((user) => {
            return user.id === id && !user.isDeleted;
        });
    }
    findAll() {
        return this.usersBase.filter((user) => {
            return !user.isDeleted;
        });
    }
    create(user: CreateUserDto) {
        const id: string = v4();
        this.usersBase.push({ id: id, isDeleted: false, ...user });
        return this.findById(id);
    }
    update(id: string, userData: UpdateUserDto) {
        let updUser: User = this.findById(id);
        if (updUser) {
            updUser.login = userData.login;
            updUser.password = userData.password;
            updUser.age = userData.age;
        }
        return updUser;
    }
    delete(id: string) {
        let delitedUser: User = this.findById(id);
        if (delitedUser) {
            delitedUser.isDeleted = true;
        }
        return delitedUser;
    }
}

export { InMemoryUsersRepository };
