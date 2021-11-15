import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  };
};

export default ormConfig;
