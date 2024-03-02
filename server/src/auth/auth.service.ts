import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client'
import { AuthDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { env } from 'process';

const prisma = new PrismaClient()

@Injectable()
export class AuthService {
    constructor(private jwtSerice:JwtService) {}

    async check(headers: any) {
        try {
            const token = headers.authorization.split(' ')[1]
            if (!token) throw new UnauthorizedException('Not authorizated')
            const decoded = this.jwtSerice.verify(token)
            const newToken = await this.tokenPair(decoded.id, decoded.password)
            return {token: newToken};
        }
        catch(err) {
            return err;
        }
    }

    async register(dto:AuthDto) {
        const oldUser = await prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (oldUser) throw new UnauthorizedException('This user already exists')

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(dto.password, salt)

        const user = await prisma.user.create({
            data: {
                email: dto.email,
                password: hashPassword
            }
        })
        const token = await this.tokenPair(user.id, user.password)
        return {
            user,
            token
        }
    }

    async login(dto:AuthDto) {
        const user = await this.validateUser(dto)
        const token = await this.tokenPair(user.id, user.password)

        return {
            user,
            token
        }
    }

    async validateUser(dto:AuthDto) {
        const user = await prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (!user) throw new UnauthorizedException('User not found')
        
        const hashedPassword = await bcrypt.compare(dto.password, user.password);
        if(!hashedPassword) throw new UnauthorizedException('Invalid password')
        return user;
    }

    async tokenPair(id:number, password:string) {
        const accessToken = await this.jwtSerice.signAsync({id, password}, {expiresIn: '48h'})
        return accessToken;
    }
}
