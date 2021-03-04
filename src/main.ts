import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Angular TP API')
    .setDescription('Angular TP API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, ProductModule],
  });
  SwaggerModule.setup('reference', app, document);

  await app.listen(3000);
}
bootstrap();
