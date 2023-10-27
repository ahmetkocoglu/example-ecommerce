import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Movement } from "../entity/Movement"

export class MovementController {
    private movementRepository = AppDataSource.getRepository(Movement)

    async addMovement(request: Request, response: Response, next: NextFunction) {
        const { 
            product_id,
            quantity
        } = request.body;

        const movement = Object.assign(new Movement(), {
            payment: false,
            user_id: 1,
            product_id: product_id,
            price: 90,
            quantity: quantity,
            amount: 90 * quantity,
            is_delete: false
        })

        return this.movementRepository.save(movement)
    }
}