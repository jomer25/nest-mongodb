import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jomer707:jomer707@cluster0.qosllbb.mongodb.net/'),
    UsersModule
  ],
})
export class AppModule {}
