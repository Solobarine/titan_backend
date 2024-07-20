import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Titan API Doc')
  .setDescription('An Documentation of the Titan Crypto API')
  .setVersion('1.0.0')
  .build();

export default swaggerConfig;
