import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/updateDto";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async updateUser(userId: number, updateData: UpdateUserDto) {
        console.log({ userId, updateData })
        return await this.prisma.user.update({ where: { id: userId }, data: { ...updateData } })

    }
}