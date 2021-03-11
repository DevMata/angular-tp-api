import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Product as ProductDoc, Product } from './doc/product.doc';
import { ProductIdParamDto } from './dto/product-id-param.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':productId')
  findOne(@Param() productIdParam: ProductIdParamDto): Promise<ProductDoc> {
    return this.productService.findOne(productIdParam.productId);
  }

  @Put(':productId')
  update(
    @Param() productIdParam: ProductIdParamDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(
      productIdParam.productId,
      updateProductDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':productId')
  remove(@Param() productIdParam: ProductIdParamDto): Promise<void> {
    return this.productService.remove(productIdParam.productId);
  }
}
