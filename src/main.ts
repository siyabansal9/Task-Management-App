// this is where app starts

import { NestFactory } from '@nestjs/core';
//class provided by the framework that is responsible for creating and initializing a NestJS application instance

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// if NestJS is a machine, then NestFactory the "factory" that builds and starts the machine

// without it NestJS application cannot start running