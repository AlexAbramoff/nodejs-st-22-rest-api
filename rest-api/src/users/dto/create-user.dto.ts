import { IsNotEmpty, Matches, Max, Min } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
        message: 'Password must contain letters and numbers',
    })
    password: string;

    @IsNotEmpty()
    @Min(4)
    @Max(130)
    age: number;
    isDeleted?: boolean;
}
