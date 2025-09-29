import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Create a new project
  @Post()
  create(@Body() body: { name: string; description?: string }) {
    return this.projectsService.create(body);
  }

  // Get all projects
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  // Get a project by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  // Update a project
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; description?: string }
  ) {
    return this.projectsService.update(id, body);
  }

  // Delete a project
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }
}
