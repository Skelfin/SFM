import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: 'ID_User'})
    id: number

    @Column()
    nickname: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    access_rights: number

    @Column({ nullable: true })
    avatar: string

    @OneToMany(() => Playlist, playlist => playlist.user)
    playlists: Playlist[];

    @CreateDateColumn({ type: 'date' })
    createdAt: Date

    @UpdateDateColumn({ type: 'date' })
    updatedAt: Date
}
 