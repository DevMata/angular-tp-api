import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Product as ProductDoc } from './doc/product.doc';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { PaginationDto } from '../core/dto/pagination.dto';
import {
  getOrmTakeAndSkip,
  getPagination,
} from '../core/utils/pagination.utils';
import { Products } from './doc/producst.doc';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDoc> {
    const newProduct = await this.productRepository.save(createProductDto);
    return plainToClass(ProductDoc, newProduct, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(pagination: PaginationDto): Promise<Products> {
    const { take, skip } = getOrmTakeAndSkip(pagination);
    const [
      products,
      totalProducts,
    ] = await this.productRepository.findAndCount({ take, skip });

    const productsResponse = {
      products,
      pagination: getPagination(pagination, totalProducts),
    };
    return plainToClass(Products, productsResponse, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(productId: number): Promise<ProductDoc> {
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException('product not found');
    }

    return plainToClass(ProductDoc, product, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDoc> {
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException('product not found');
    }

    const updatedProduct = await this.productRepository.save({
      ...product,
      ...updateProductDto,
    });
    return plainToClass(ProductDoc, updatedProduct, {
      excludeExtraneousValues: true,
    });
  }

  async remove(productId: number): Promise<void> {
    await this.findOne(productId);
    await this.productRepository.delete(productId);
  }
}
