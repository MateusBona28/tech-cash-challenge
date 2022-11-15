import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from "typeorm";
import { Transaction } from "./transactions.entity";

@Entity("accounts")

export class Account {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type:"decimal", precision: 10, scale: 2 , default: 100 })
    balance: number

    @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
    debitedTransactions: Transaction[]

    @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
    creditedTransactions: Transaction[]
    
}