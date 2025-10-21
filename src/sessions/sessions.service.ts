import { AppDataSource } from "@/data-source";
import { Session } from "@/sessions/session";

export class SessionsService {
  private readonly repository = AppDataSource.getRepository(Session);

  public async list(): Promise<Session[]> {
    return await this.repository.find();
  }

  public async existsByName(name: string): Promise<boolean> {
    return await this.repository.existsBy({ name: name });
  }

  public async save(session: Session): Promise<Session> {
    return await this.repository.save(session);
  }

  public async getByName(name: string): Promise<Session | null> {
    return await this.repository.findOne({ where: { name: name } });
  }
}
