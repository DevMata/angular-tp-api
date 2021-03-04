import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const {
      DATABASE_URL = 'postgres://myUser:myPassword@localhost:5432/angular_tp_db',
    } = process.env;

    return {
      type: 'postgres',
      url: DATABASE_URL,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    };
  }
}
