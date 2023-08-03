import { Body, Controller, Post, Req, HttpStatus, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { Request } from "express";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log(dto)
        return this.authService.signup(dto)
    }
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {

        return this.authService.signin(dto)
    }
}