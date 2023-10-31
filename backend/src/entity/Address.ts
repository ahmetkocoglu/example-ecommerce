import { title } from "process"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    line: string

    @Column()
    post_code: string

    @Column()
    district: string

    @Column()
    city: string

    @Column()
    country: string

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User
}
