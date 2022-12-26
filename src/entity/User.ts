import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Task } from "./Task"; 


@Entity()
export class User extends BaseEntity{
    // @PrimaryGeneratedColumn("uuid")
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        name: 'name',
        type: 'text',
        nullable: true 
    })
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(()=> Task, task=>task.user, { cascade: true, eager: true })
    task: Task[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}