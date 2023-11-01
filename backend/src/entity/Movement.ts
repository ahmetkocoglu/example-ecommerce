import { title } from "process"
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Product } from "./Product"

@Entity()
export class Movement {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    payment: boolean

    @Column('decimal', { precision: 6, scale: 2 })
    price: number

    @Column()
    quantity: number

    @Column('decimal', { precision: 6, scale: 2 })
    amount: number

    @Column()
    is_delete: boolean

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn()
    product: Product
}
