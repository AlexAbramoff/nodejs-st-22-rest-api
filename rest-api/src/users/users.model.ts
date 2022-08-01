import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttr {
    id: string;
    login: string;
    password: string;
    age: number;
}

@Table({ tableName: 'users' })
class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        unique: true,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    login: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.INTEGER,
    })
    age: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isDeleted: boolean;
}

export { User };
