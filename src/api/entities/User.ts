import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import Message from "./Message";


@Entity("user")
export default class User {

  @PrimaryColumn()
  id: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

}
