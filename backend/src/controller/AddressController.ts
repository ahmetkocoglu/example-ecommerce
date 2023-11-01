import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import jwt = require('jsonwebtoken');
import { Address } from "../entity/Address";

export class AddressController {

    private addressRepository = AppDataSource.getRepository(Address)
    private userRepository = AppDataSource.getRepository(User)

    async save(request: Request, response: Response, next: NextFunction) {
        const { line, post_code, district, city, country }: Address = request.body;

        const isLogin: any = jwt.verify(request.headers.authorization.replace('Bearer ', ''), "secret");
        const user = await this.userRepository.findOne({
            where: { id: isLogin.id }
        })

        const address = Object.assign(new Address(), {
            line: line,
            post_code: post_code,
            district: district,
            city: city,
            country: country,
            user
        })

        return this.addressRepository.save(address)
    }
}