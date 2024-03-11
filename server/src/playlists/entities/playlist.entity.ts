import { Track } from "src/tracks/entities/track.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn({ name: 'ID_Playlist'})
    id: number

    @Column()
    Name: string

    @Column({ nullable: true })
    avatar: string

    @Column({ nullable: true })
    description: string

    @ManyToMany(() => User, user => user.playlists)
    @JoinTable({
      name: "user_playlists", // Имя таблицы связи
      joinColumn: {
        name: "id_playlist", // Имя столбца, который ссылается на ID плейлиста
        referencedColumnName: "id"
      },
      inverseJoinColumn: {
        name: "id_user", // Имя столбца, который ссылается на ID пользователя
        referencedColumnName: "id"
      }
    })
    users: User[];

    @ManyToMany(() => Track, track => track.playlists) // Установка отношения ManyToMany
    @JoinTable({ // JoinTable следует указывать только с одной стороны отношения, обычно с владеющей стороны.
        name: 'playlist_tracks', // Название таблицы связи
        joinColumn: {
            name: 'id_playlist', // Название столбца, который будет ссылаться на первичный ключ Playlist
            referencedColumnName: 'id' // Название первичного ключа в сущности Playlist
        },
        inverseJoinColumn: {
            name: 'id_track', // Название столбца, который будет ссылаться на первичный ключ Track
            referencedColumnName: 'id' // Название первичного ключа в сущности Track
        }
    })
    tracks: Track[];


    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
