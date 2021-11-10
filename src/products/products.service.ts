import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const [product] = this.findProduct(productId);

        if (!product) {
            throw new NotFoundException('Could not find product.');
        }

        return {...product};
    }

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);

        return prodId;
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        const [product, productIndex] = this.findProduct(productId);
        const updatedProduct = {...product};
        const newProps = { title, description, price };

        for (const property in newProps) {
            if (newProps[property]) {
                updatedProduct[property] = newProps[property];
            }
        }

        if (!product) {
            throw new NotFoundException('Could not find product.');
        }

        this.products[productIndex] = updatedProduct;

        return {...product};
    }

    deleteProduct(productId: string) {
        const [_, productIndex] = this.findProduct(productId);

        if (!productIndex) {
            throw new NotFoundException('Could not find product.');
        }

        // filter array product !== product, this.products = filteredProducts?
        this.products.splice(productIndex, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];

        if (!product) {
            throw new NotFoundException('Could not find product.');
        }

        return [{...product}, productIndex];
    }
}