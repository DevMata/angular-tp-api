import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './type-orm-config.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ProductModule,
    AuthModule,
  ],
  providers: [TypeOrmConfigService],
})
export class AppModule {}
