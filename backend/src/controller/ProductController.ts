import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product"

export class ProductController {
    private productRepository = AppDataSource.getRepository(Product)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find()
    }

    async deleteProduct(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let productToRemove = await this.productRepository.findOneBy({id})
       
        if(!productToRemove) return "this product not exist"
        
        //await this.productRepository.remove(productToRemove)
        await this.productRepository.update(
            { id: id },
            {
                is_delete: true
            }
        );

        return "product has been removed";
    }
}