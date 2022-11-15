import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("accounts")

export class Account {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type:"decimal", precision: 10, scale: 2 , default: 100 })
    balance: number
}