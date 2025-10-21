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

  public async deleteByName(name: string): Promise<boolean> {
    const session = await this.getByName(name);

    if (!session) {
      return false;
    }

    await this.repository.delete(session);
    return true;
  }

  public async updateConnectivityByName(
    name: string,
    connected: boolean,
  ): Promise<void> {
    const session = await this.getByName(name);

    if (!session) {
      return;
    }

    session.isConnected = connected;
    await this.save(session);
  }

  public async updateQRCodeByName(name: string, qr: string): Promise<void> {
      const session = await this.getByName(name);

      if (!session) {
          return;
      }

      session.qr = qr;
      await this.save(session);
  }
}
