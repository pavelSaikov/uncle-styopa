import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EnvVariable } from 'src/models';
import { UserModule } from 'src/modules/user';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './password-strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(EnvVariable.JWT_SECRET),
        signOptions: { expiresIn: config.get<string>(EnvVariable.JWT_EXPIRATION_TIME) },
      }),
    }),
  ],
})
export class AuthModule {}
