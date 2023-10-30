import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Movement } from "../entity/Movement"
import { Product } from "../entity/Product"

export class MovementController {
    private movementRepository = AppDataSource.getRepository(Movement)
    private productRepository = AppDataSource.getRepository(Product)

    async addMovement(request: Request, response: Response, next: NextFunction) {
        const {
            product_id,
            quantity
        } = request.body;

        const product = await this.productRepository.findOne({
            where: { id: product_id }
        })

        const movementRow = await this.movementRepository.findOne({
            where: { product_id: product_id }
        })

        if (product && !movementRow) {
            const movement = Object.assign(new Movement(), {
                payment: false,
                user_id: 1,
                product_id: product_id,
                price: product.discountPrice,
                quantity: quantity,
                amount: product.discountPrice * quantity,
                is_delete: false
            });
            return this.movementRepository.save(movement);
        } else {
            return this.movementRepository.update(
                { product_id: product_id },
                {
                    quantity: quantity,
                    amount: product.discountPrice * quantity
                }
            );
        }
    }

    async deleteMovement(request: Request, response: Response, next: NextFunction) {
        console.log('delete');
        return "";
    }
}