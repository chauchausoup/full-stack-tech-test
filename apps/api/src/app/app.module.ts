import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CreditorModule } from '../creditor/creditor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydb.sqlite', // specify the database file path
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // specify all entities to be used in the app
      synchronize: true, // auto-create database schema based on entities
    }),
    UserModule,
    CreditorModule,
  ],
})
export class AppModule {}
