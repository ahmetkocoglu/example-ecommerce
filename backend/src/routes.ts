import { MovementController } from "./controller/MovementController"
import { ProductController } from "./controller/ProductController"
import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login"
}, {
    method: "get",
    route: "/users/me",
    controller: UserController,
    action: "me"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "all"
}, {
    method: "delete",
    route: "/product/:id",
    controller: ProductController,
    action: "deleteProduct"
}, {
    method: "post",
    route: "/add-movement",
    controller: MovementController,
    action: "addMovement"
}, {
    method: "delete",
    route: "/movement/:id",
    controller: MovementController,
    action: "deleteMovement"
}, {
    method: "get",
    route: "/payment",
    controller: MovementController,
    action: "payment"
}, {
    method: "get",
    route: "/movements",
    controller: MovementController,
    action: "all"
}]