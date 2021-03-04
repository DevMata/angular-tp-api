import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const {
      DATABASE_URL = 'postgres://myUser:myPassword@localhost:5432/angular_tp_db',
      NODE_ENV,
    } = process.env;

    const extra =
      NODE_ENV === 'dev'
        ? null
        : {
            ssl: {
              rejectUnauthorized: false,
            },
          };

    return {
      type: 'postgres',
      url: DATABASE_URL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra,
    };
  }
}
