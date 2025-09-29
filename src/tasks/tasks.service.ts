// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { Express } from 'express';
import { FileService } from '../files/file.service';

@Injectable()
export class TasksService {
  private prisma = new PrismaClient();

  constructor(private readonly fileService: FileService) {}

  async createTaskWithFile(
    data: { title: string; description?: string; projectId: number; assigneeId?: number },
    file?: Express.Multer.File,
  ) {
    try {
      // Create task
      const task = await this.prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          projectId: data.projectId,
          assigneeId: data.assigneeId,
        },
      });

      // Upload file if exists
      if (file) {
        const url = await this.fileService.uploadFile(file);
        await this.prisma.file.create({
          data: {
            filename: file.originalname,
            path: url,
            taskId: task.id,
          },
        });
      }

      // Return task with relations
      return this.prisma.task.findUnique({
        where: { id: task.id },
        include: { files: true, assignee: true, project: true },
      });
    } catch (err) {
      console.error('Error creating task with file:', err);
      throw err;
    }
  }

  findAll() {
    return this.prisma.task.findMany({ include: { files: true, assignee: true, project: true } });
  }
}
