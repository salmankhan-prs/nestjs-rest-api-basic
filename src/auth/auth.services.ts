import { Injectable, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { Prisma } from '@prisma/client';
import { ConfigService } from "@nestjs/config";


Prisma.PrismaClientKnownRequestError
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {

    }
    async signup(userDetails: AuthDto) {
        const hash = await argon.hash(userDetails.password)
        console.log({ hash })

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: userDetails.email,
                    hash
                }
            })
            delete user.hash
            return user
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log({ error })
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }

            throw error
        }

    }
    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) throw new ForbiddenException('Creditional Incorrect')
        const pwMatches = await argon.verify(user.hash, dto.password)
        if (!pwMatches) throw new ForbiddenException('Creditional Incorrect')

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string) {

        const data = {
            sub: userId,
            email
        }
        const secret = this.config.get('secret')

        const token = await this.jwt.signAsync(data, {
            expiresIn: "1000m",
            secret

        })
        return {
            access_token: token
        }
    }
}