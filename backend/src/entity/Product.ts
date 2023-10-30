import { title } from "process"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    seo: string

    @Column('decimal', { precision: 6, scale: 2 })
    price!: number

    @Column('decimal', { precision: 6, scale: 2 })
    discountPrice!: number

    @Column()
    is_delete: boolean
}
