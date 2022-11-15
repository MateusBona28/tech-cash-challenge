import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Account } from "./accounts.entity";

@Entity("users")

export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true, length: 90 })
    username: string

    @Column({ length: 120 })
    password: string

    @OneToOne(() => Account)
    @JoinColumn()
    account: Account

}