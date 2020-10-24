import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

export interface UserView {
    id: number
    name: string
    email: string
}

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    name: string
    @Column()
    email: string
    @Column()
    password: string
}
