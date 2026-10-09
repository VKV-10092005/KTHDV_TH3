
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(
        `Không tìm thấy sản phẩm có ID ${id}`,
      );
    }

    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      name: dto.name,
      description: dto.description ?? null,
      price: String(dto.price),
      quantity: dto.quantity,
    });

    return this.productRepository.save(product);
  }

  async update(
    id: number,
    dto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (dto.name !== undefined) {
      product.name = dto.name;
    }

    if (dto.description !== undefined) {
      product.description = dto.description;
    }

    if (dto.price !== undefined) {
      product.price = String(dto.price);
    }

    if (dto.quantity !== undefined) {
      product.quantity = dto.quantity;
    }

    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);

    return {
      message: `Đã xóa sản phẩm có ID ${id}`,
    };
  }
}