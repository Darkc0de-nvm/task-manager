import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(status?: string): Promise<(Task & { isOverdue: boolean })[]> {
    const where = status ? { status } : {};
    const tasks = await this.tasksRepository.find({ where });

    return tasks.map((task) => ({
      ...task,
      isOverdue: task.status === 'open' && new Date(task.dueDate) < new Date(),
    }));
  }

  async create(
    createTaskDto: CreateTaskDto,
  ): Promise<Task & { isOverdue: boolean }> {
    const task = this.tasksRepository.create({
      title: createTaskDto.title,
      dueDate: new Date(createTaskDto.dueDate),
    });
    const saved = await this.tasksRepository.save(task);

    return {
      ...saved,
      isOverdue: false,
    };
  }

  async complete(id: number): Promise<Task & { isOverdue: boolean }> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Задача з id ${id} не знайдена`);
    }

    task.status = 'completed';
    const saved = await this.tasksRepository.save(task);

    return {
      ...saved,
      isOverdue: false,
    };
  }
}
