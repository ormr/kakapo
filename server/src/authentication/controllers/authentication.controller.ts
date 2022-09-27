import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from '../services/authentication.service';
import { RegisterDto } from '../dto/register.dto';
import { RequestWithUser } from '../interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from '../guards/local-authentication.guard';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) { }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return await this.authenticationService.register(registrationData);
  }

  @Post('log-in')
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);

    user.password = undefined;
    return user;
  }

  @Post('log-out')
  @UseGuards(JwtAuthenticationGuard)
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());

    return response.sendStatus(200);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
