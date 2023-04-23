import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { Creditor } from './entity/creditor.entity';
import { UserCreditor } from './entity/user-creditor.entity';
import { UserModule } from './user/user.module';
import { CreditorModule } from './creditor/creditor.module';
import { UserCreditorModule } from './user-creditor/user-creditor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydb.sqlite', // specify the database file path
      entities: [User, Creditor, UserCreditor], // specify all entities to be used in the app
      synchronize: true, // auto-create database schema based on entities
    }),
    UserModule,
    CreditorModule,
    UserCreditorModule,
  ],
})
export class AppModule {}
