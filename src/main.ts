import { DomainErrorsFilter } from '@/filters/domain-errors-filter';
import { GlobalErrorsFilter } from '@/filters/global-errors-filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(new GlobalErrorsFilter(), new DomainErrorsFilter());

  const config = new DocumentBuilder()
    .setTitle('Desafio Serasa Experian')
    .setDescription(
      'Documentação da API do desafio para a vaga de backend do Serasa Experian',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, { autoTagControllers: true });

  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
