import { Author } from "src/author/entities/author.entity";
import { Track } from "src/tracks/entities/track.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn({ name: 'ID_Album' })
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    avatar: string

    @Column({ nullable: true, type: 'int' })
    year: number

    @OneToMany(() => Track, track => track.album)
    tracks: Track[];

    @ManyToMany(() => Author, author => author.albums)
    @JoinTable({
        name: "album_author", // Название таблицы связей
        joinColumn: { name: "id_album", referencedColumnName: "id" },
        inverseJoinColumn: { name: "id_author", referencedColumnName: "id" }
    })
    authors: Author[];

    @CreateDateColumn({ type: 'date' })
    createdAt: Date

    @UpdateDateColumn({ type: 'date' })
    updatedAt: Date
}
