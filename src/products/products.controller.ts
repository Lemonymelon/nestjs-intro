import { Controller, Get, Post, Patch, Delete, Body, Param } from "@nestjs/common";

import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)

        return { id: generatedId };
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string) {
        this.productsService.deleteProduct((prodId));
    }
}