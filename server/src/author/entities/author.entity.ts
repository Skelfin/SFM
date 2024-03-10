import { Album } from "src/albums/entities/album.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn({ name: 'ID_Author' })
    id: number

    @Column()
    nickname: string

    @Column()
    FIO: string

    @Column()
    email: string
    
    @Column()
    description: string

    @Column()
    country: string

    @Column()
    avatar: string

    @ManyToMany(() => Album, album => album.authors)
    @JoinTable()
    albums: Album[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
