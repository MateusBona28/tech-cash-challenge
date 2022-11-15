import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")

export class Users {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true, length: 90 })
    username: string

    @Column({ length: 120 })
    password: string

}