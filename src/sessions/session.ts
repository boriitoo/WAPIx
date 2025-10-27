import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @CreateDateColumn()
  lastSeenAt: Date;

  public get isActive() {
    return this.secondsSinceLastSeenAt() < 60;
  }

  public secondsSinceLastSeenAt() {
    const now = new Date();
    return (now.getTime() - this.lastSeenAt.getTime()) / 1000;
  }
}
