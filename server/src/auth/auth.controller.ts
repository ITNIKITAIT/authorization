import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Headers } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import {AuthService} from './auth.service'


@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService:AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() dto: AuthDto) {
        return this.AuthService.login(dto);
    }

    @Get('hello')
    async getHello() {
        return 'hello'
    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto) {
        return this.AuthService.register(dto);
    }

    @Get()
    async check(@Headers() headers: any) {
        return this.AuthService.check(headers);
    }

}
