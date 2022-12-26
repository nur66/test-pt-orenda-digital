import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Task extends BaseEntity{
    // @PrimaryGeneratedColumn("uuid")
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    status:string;

    @ManyToOne(()=> User, user=>user.task, {onDelete : "CASCADE"})
    @JoinColumn({name: 'userId'})
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}