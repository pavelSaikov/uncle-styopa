import { Module } from '@nestjs/common';

import { AuthModule, UserModule } from 'src/modules';

@Module({
  imports: [UserModule, AuthModule],
})
export class UserRouteModule {}
