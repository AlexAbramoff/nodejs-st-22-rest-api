import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userSrv: UserService) {}

    @Get()
    getAutoSuggestUsers(
        @Query('loginSubstring') subString: string,
        @Query('limit') limit: number,
    ) {
        return this.userSrv.getAutoSuggestUsers(subString, +limit);
    }

    @Get(':id')
    getById(@Param('id') id: string): User {
        return this.userSrv.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() user: CreateUserDto) {
        if (!this.userSrv.checkUserExist(user.login)) {
            return this.userSrv.createUser(user);
        } else {
            throw new HttpException('User alredy exist', 409);
        }
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
        if (!this.userSrv.checkUserExist(userData.login)) {
            return this.userSrv.updateUser(id, userData);
        } else {
            throw new HttpException('User with that login alredy exist', 409);
        }
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userSrv.removeUser(id);
    }
}
