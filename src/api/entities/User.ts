import {
  Entity,
  PrimaryColumn,
} from "typeorm";


@Entity("user")
export default class User {

  @PrimaryColumn()
  username: string;

}
