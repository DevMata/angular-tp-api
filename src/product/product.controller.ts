import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product } from './doc/product.doc';
import { ProductIdParamDto } from './dto/product-id-param.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Products')
@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':productId')
  findOne(@Param() productIdParam: ProductIdParamDto): Promise<Product> {
    return this.productService.findOne(productIdParam.productId);
  }

  @Patch(':productId')
  update(
    @Param() productIdParam: ProductIdParamDto,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
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
