import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Movement } from "../entity/Movement"
import { Product } from "../entity/Product"
import { User } from "../entity/User"

export class MovementController {
    private movementRepository = AppDataSource.getRepository(Movement)
    private productRepository = AppDataSource.getRepository(Product)
    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.movementRepository.find({relations: {product: true, user: true}})
    }
    
    async addMovement(request: Request, response: Response, next: NextFunction) {
        const {
            product_id,
            quantity
        } = request.body;

        const product = await this.productRepository.findOne({
            where: { id: product_id }
        })

        const user = await this.userRepository.findOne({
            where: { id: 1 }
        })

        const movementRow = await this.movementRepository.findOne({
            where: { product }
        })

        if (product && !movementRow) {
            const movement = Object.assign(new Movement(), {
                payment: false,
                user: user,
                product: product,
                price: product.discountPrice,
                quantity: quantity,
                amount: product.discountPrice * quantity,
                is_delete: false
            });
            return this.movementRepository.save(movement);
        } else {
            return this.movementRepository.update(
                { product },
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