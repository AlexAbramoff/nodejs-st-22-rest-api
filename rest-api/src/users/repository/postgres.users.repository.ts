import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { v4 } from 'uuid';
import { UsersRepository } from './users.repository';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users.model';

@Injectable()
class PostgresRepository implements UsersRepository {
    constructor(@InjectModel(User) private postgresRep: typeof User) {}

    async findById(id: string) {
        const user = await this.postgresRep.findOne({
            where: { id: id, isDeleted: false },
        });
        return user;
    }
    async findAll() {
        const users = await this.postgresRep.findAll({
            where: { isDeleted: false },
        });
        return users;
    }
    async create(userDto: CreateUserDto) {
        const id = v4();
        const userModel = { id, ...userDto };
        const user = await this.postgresRep.create(userModel);
        return user;
    }
    async update(id: string, userData: UpdateUserDto) {
        const updUser = await this.findById(id);
        if (updUser) {
            await this.postgresRep.update(
                {
                    login: userData.login,
                    password: userData.password,
                    age: userData.age,
                },
                { where: { id: id } },
            );
        }
        return await this.findById(id);
    }
    async delete(id: string) {
        await this.postgresRep.update(
            { isDeleted: true },
            { where: { id: id } },
        );
        return await this.postgresRep.findByPk(id);
    }
}

export { PostgresRepository };
