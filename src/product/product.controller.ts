import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: { type: Product },
  params: {
    productId: {
      primary: true,
      field: 'productId',
      type: 'number',
    },
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@ApiTags('Products')
@Controller('products')
export class ProductController implements CrudController<Product> {
  constructor(public service: ProductService) {}
}
