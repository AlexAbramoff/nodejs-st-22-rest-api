import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { updateUserDto } from '../dto/update-user.dto';
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
        return this.userSrv.createUser(user);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userData: updateUserDto) {
        return this.userSrv.updateUser(id, userData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUser(@Param('id') id: string) {
        return this.userSrv.removeUser(id);
    }
}
