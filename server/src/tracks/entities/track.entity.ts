import { Album } from 'src/albums/entities/album.entity';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Track {
    @PrimaryGeneratedColumn({ name: 'ID_Track' })
    id: number

    @Column()
    path: string

    @Column()
    avatar: string

    @Column()
    name: string

    @ManyToOne(() => Album, album => album.tracks)
    @JoinColumn({ name: 'id_album'})
    album: Album;

    @ManyToMany(() => Playlist, playlist => playlist.tracks)
    playlists: Playlist[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
