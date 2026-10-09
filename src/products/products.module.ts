
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    JwtModule.register({
      secret: 'TH2_SECRET_KEY',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, JwtAuthGuard],
})
export class ProductsModule {}