import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { FileModule } from 'src/files/file.module';

@Module({
  imports: [FileModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
