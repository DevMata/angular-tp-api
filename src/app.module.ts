import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './type-orm-config.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    UserModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKENS_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKENS_SECRET,
      },
    }),
  ],
  providers: [TypeOrmConfigService],
})
export class AppModule {}
