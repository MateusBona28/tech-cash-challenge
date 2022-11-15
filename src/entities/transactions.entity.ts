import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Account } from "./accounts.entity";
import { User } from "./users.entity";

@Entity("transactions")

export class Transaction {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @CreateDateColumn({ type: "date" })
    createdAt: Date

    @Column({ type:"decimal", precision: 10, scale: 2 , default: 100 })
    value: number

    @ManyToOne(() => Account, (account) => account.debitedTransactions)
    debitedAccount: Account

    @ManyToOne(() => Account, (account) => account.creditedTransactions)
    creditedAccount: Account
    
}