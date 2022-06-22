import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { joiConfigFactory, mongooseConfigFactory } from './config';
import { AuthController, AuthModule, FilesModule, UserModule, UserRouteController } from './modules';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: mongooseConfigFactory,
    }),
    ConfigModule.forRoot(joiConfigFactory()),
    FilesModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AuthController, UserRouteController],
  providers: [],
})
export class AppModule {}
