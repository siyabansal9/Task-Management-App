import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProjectsService {
  private prisma = new PrismaClient();

  // Create a new project 
  create(data: { name: string; description?: string }) {
    return this.prisma.project.create({ data });
  }

  // Get all projects
  findAll() {
    return this.prisma.project.findMany({ include: { tasks: true } });
  }

  // Get a project by ID
  async findOne(id: number) {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id },
        include: { tasks: true },
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      return project;
    } catch (err) {
      console.error('Find project error:', err);

      // If already a NestJS exception, rethrow
      if (err.status) throw err;

      throw new InternalServerErrorException('Failed to fetch the project');
    }
  }

  // Update a project
  async update(id: number, data: { name?: string; description?: string }) {
    try {
      const updatedProject = await this.prisma.project.update({
        where: { id },
        data,
      });

      return updatedProject;
    } catch (err) {
      console.error('Update project error:', err);

      // Prisma error code P2025 = record not found
      if (err.code === 'P2025') {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      throw new InternalServerErrorException('Failed to update project');
    }
  }

  // Delete a project
  async remove(id: number) {
    try {
      const deletedProject = await this.prisma.project.delete({ where: { id } });
      return deletedProject;
    } catch (err) {
      console.error('Delete project error:', err);

      if (err.code === 'P2025') {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      throw new InternalServerErrorException('Failed to delete project');
    }
  }
}
