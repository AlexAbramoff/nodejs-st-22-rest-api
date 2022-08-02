import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UserController {
    constructor(private userSrv: UsersService) {}

    @Get()
    getAll(
        @Query('loginSubstring') subString: string,
        @Query('limit') limit: number,
    ) {
        return this.userSrv.getAll(subString, +limit);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const user = await this.userSrv.getById(id);
        if (user) {
            return user;
        } else {
            throw new NotFoundException('User not found');
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() user: CreateUserDto) {
        return this.userSrv.createUser(user);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
        if (!(await this.userSrv.checkUserExist(userData.login))) {
            return this.userSrv.updateUser(id, userData);
        } else {
            throw new HttpException('User with that login alredy exist', 409);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id') id: string) {
        if (await this.userSrv.getById(id)) {
            return await this.userSrv.removeUser(id);
        } else {
            throw new NotFoundException('User not found');
        }
    }
}
