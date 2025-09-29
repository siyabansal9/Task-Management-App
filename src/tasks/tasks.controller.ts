// src/tasks/tasks.controller.ts
import { Controller, Post, Get, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TasksService } from './tasks.service';
import type { Express } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  createTaskWithFile(
    @Body() body: { title: string; description?: string; projectId: string; assigneeId?: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.tasksService.createTaskWithFile(
      {
        title: body.title,
        description: body.description,
        projectId: Number(body.projectId),
        assigneeId: body.assigneeId ? Number(body.assigneeId) : undefined,
      },
      file,
    );
  }

  // Get all tasks
  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }
}
