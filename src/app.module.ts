import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './type-orm-config.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    UserModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  providers: [TypeOrmConfigService],
})
export class AppModule {}
