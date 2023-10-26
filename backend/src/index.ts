import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
var cors = require('cors');

AppDataSource.initialize().then(async () => {
// fork test işlemi -- test işlemi -- ikinci test işlemi
    // create express app
    // hello world
    const app = express()
    app.use(bodyParser.json())
    app.use(cors({
        credentials: true,
      }));

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3040)

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            email: "abc@xyz.com",
            password: "1234",
            phone: "05001112233",
            firstName: "Timber",
            lastName: "Saw"
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            email: "def@xyz.com",
            password: "1234",
            phone: "05001112244",
            firstName: "Phantom",
            lastName: "Assassin"
        })
    )

    console.log("Express server has started on port 3040. Open http://localhost:3040/users to see results")

}).catch(error => console.log(error))
