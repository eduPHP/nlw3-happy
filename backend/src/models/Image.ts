import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeRemove} from 'typeorm'
import path from 'path'
import fs from 'fs'

import Orphanage from './Orphanage'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    path: string
    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({name: 'orphanage_id'})
    orphanage: Orphanage

    @BeforeRemove()
    removeFile() {
        console.log('removendo')

        const file = path.join(__dirname, '..' /*src*/, '..' /*raiz*/, 'uploads', this.path)
        console.log(file);
        try {
            fs.unlinkSync(file)
        } catch (err) {
            console.log(err);
        }
    }

}

