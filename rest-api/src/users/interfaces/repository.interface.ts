import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

interface Repository {
    findById(id: string);
    findAll();
    create(user: CreateUserDto);
    update(id: string, userData: UpdateUserDto);
    delete(id: string);
}
export { Repository };
