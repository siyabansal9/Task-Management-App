//this root module is like the main enrty point that tells NestJS which other modules, controllers, and services to load when the app starts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; //used to read environment variables from a .env file
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { FileModule } from './files/file.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //loads .env and makes it accessible globally (don't need to import configModule again in other modules)
    AuthModule,
    ProjectsModule,
    TasksModule,
    FileModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


//imports required modules
//registers global settings
//declares which controllers and services should be available at the root level
// exports app module, which is used in main.ts by NestFactory.create(AppModule)