import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: 'ID_User'})
    id: number
    @Column()
    nickname: string
    @Column()
    password: string
    @Column()
    access_rights: number
    @Column({ nullable: true })
    avatar: string
    @Column({ nullable: true })
    FIO: string
    @Column({ nullable: true })
    email: string
    @Column({ nullable: true })
    country: string

    @ManyToMany(() => Playlist, playlist => playlist.users)
    playlists: Playlist[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
 