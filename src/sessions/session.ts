import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  qr: string;

  @Column()
  webhook: string;

  @Column()
  lastSeenAt: Date;
}
