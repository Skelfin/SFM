import { Author } from "src/author/entities/author.entity";
import { Track } from "src/tracks/entities/track.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn({ name: 'ID_Album' })
    id: number

    @Column()
    Name: string

    @Column()
    description: string

    @Column()
    avatar: string

    @Column()
    year: Date

    @OneToMany(() => Track, track => track.album)
    tracks: Track[];

    @ManyToMany(() => Author, author => author.albums)
    authors: Author[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
