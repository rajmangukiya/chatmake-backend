import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";
import Room from "./Room"
import { messageStatus } from "../../utils/const";

@Entity("message")
export default class Message {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Room, (room) => room.messages, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "room_id" })
  room: Room;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "username" })
  user: User;

  @Column()
  message: string;

  @Column({
    type: 'enum',
    enum: messageStatus,
    default: messageStatus.pending
  })
  messageStatus: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  created_at: Date;

}
