import { IsOptional, IsString, Length, isNotEmptyObject } from "class-validator"

export class createBookmarkDto {
    @IsString()
    @Length(2, 10)
    title: string
    @IsOptional()
    description?: string
    @IsString()
    link: string
}