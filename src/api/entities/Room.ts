import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Message from "./Message"

@Entity("room")
export default class Room {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true
  })
  image: string;

  @Column()
  name: string;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

}
