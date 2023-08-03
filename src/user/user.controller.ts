import { Controller, Get, UseGuards, Req, Put, Body } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from '../auth/decarators';
import { JwtGuard } from '../auth/guard';
import { UpdateUserDto } from './dto/updateDto';
import { UserService } from './user.service';
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        return user

    }
    @UseGuards(JwtGuard)
    @Put("update")
    updateUserDetails(@GetUser('id') id: number, @Body() updateDetails: UpdateUserDto) {
        return this.userService.updateUser(id, updateDetails)

    }
}





