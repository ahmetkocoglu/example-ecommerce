import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import jwt = require('jsonwebtoken');

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;

        const user = await this.userRepository.findOne({
            where: { email, password }
        })

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60, 
            data: user,
        }, "secret")

        if (user)
            return token
        else
            return false
    }

    async me(request: Request, response: Response, next: NextFunction) {        
        try {
            const isLogin: any = jwt.verify(request.headers.authorization.replace('Bearer ', ''), "secret");

            const email = isLogin.data.email;

            const user = await this.userRepository.findOne({
                where: { email }
            })
    
            if (!user) {
                return "unregistered user"
            }
            return user
        } catch {
            return false
        }
    }
}