import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";



@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('secret')
        })
    }

    async validate(payload: any) {
        const users = await this.prisma.user.findUnique({ where: { id: payload.sub } })
        console.log({ users })
        delete users.hash
        return users
    }
}