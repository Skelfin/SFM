import { Album } from "src/albums/entities/album.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn({ name: 'ID_Author' })
    id: number

    @Column()
    nickname: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    avatar: string

    @ManyToMany(() => Album, album => album.authors)
    albums: Album[];

    @CreateDateColumn({ type: 'date' })
    createdAt: Date

    @UpdateDateColumn({ type: 'date' })
    updatedAt: Date
}
