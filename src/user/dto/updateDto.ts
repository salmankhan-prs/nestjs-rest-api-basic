import { IsOptional, IsString, Length, Min, Validate, ValidateIf, min, validate } from "class-validator"


export class UpdateUserDto {
    @IsString()
    @Length(4)
    @IsOptional()
    firstName?: string
    @IsString()
    @Length(4)
    lastName?: string
}