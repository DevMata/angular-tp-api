import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';
import { ProductModule } from './product/product.module';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validationError: { target: false },
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Angular Trainee Program API')
    .setDescription('Angular Trainee Program API')
    .setVersion('1.3.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, ProductModule],
  });
  SwaggerModule.setup('reference', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
