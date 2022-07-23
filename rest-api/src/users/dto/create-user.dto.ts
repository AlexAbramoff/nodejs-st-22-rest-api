import { IsNotEmpty, Matches, Max, Min } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    @Matches(/[0-9A-Fa-f]/g, {
        message: 'Password must contain letters and numbers',
    })
    password: string;

    @IsNotEmpty()
    @Min(4)
    @Max(130)
    age: number;
    isDeleted?: boolean;
}
