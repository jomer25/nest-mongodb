import { HttpException, Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorMessageDto } from './dto/error-message.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  
  async findOne(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(new ErrorMessageDto('Invalid user ID'));
    }

    try {
      const user = await this.userModel
        .findOne({ _id: id })
        .exec();

      if (!user) {
        throw new NotFoundException(new ErrorMessageDto('User not found'));
      }

      return user;
    } catch (error) {
      throw new NotFoundException(new ErrorMessageDto(error.message));
    }    
  }

  async update(
    id: string, 
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(new ErrorMessageDto('Invalid user ID'));
    }

    try {
      const updateUser = await this.userModel
        .findOneAndUpdate({ _id: id }, updateUserDto, { new: true })
        .exec();

      if (!updateUser) {
        throw new NotFoundException(new ErrorMessageDto('User not found'));
      }

      return updateUser;
    } catch (error) {
      throw new NotFoundException(new ErrorMessageDto(error.message));
    } 
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(new ErrorMessageDto('Invalid user ID'));
    }

    try {
      const deleteUser = await this.userModel
        .findOneAndRemove({ _id: id })
        .exec();
      
      if (!deleteUser) {
        throw new NotFoundException(new ErrorMessageDto('User not found'));
      }

      return deleteUser;
    } catch (error) {
      throw new NotFoundException(new ErrorMessageDto(error.message));
    }
  }
}
