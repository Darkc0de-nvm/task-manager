import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title не може бути порожнім' })
  title!: string;

  @IsDateString({}, { message: 'dueDate має бути коректною датою' })
  dueDate!: string;
}
