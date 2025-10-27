import { SessionsService } from "@/sessions/sessions.service";
import { Session } from "@/sessions/session";
import { inject, injectable, singleton } from "tsyringe";
import { logger } from "@/logger";
import { SessionClient } from "@/sessions/session.client";

@injectable()
@singleton()
export class ClientRegistry {
  private readonly registry: Map<String, SessionClient> = new Map();

  constructor(
    @inject(SessionsService) private readonly service: SessionsService,
  ) {}

  async init(): Promise<void> {
    logger.info("Initializing existing sessions.");
    const sessions = await this.service.list();
    logger.info(`Found ${sessions.length} sessions.`);
    for (const session of sessions) {
      logger.info(`Initializing ${session.name} session.`);
      await this.startClient(session.name, session.webhook);
    }
  }

  async startClient(name: string, webhook: string): Promise<void> {
    if (this.registry.has(name)) {
      logger.info(`Registry entry with name ${name} already started`);
      return;
    }

    let session = await this.service.getByName(name);

    if (!session) {
      session = await this.service.save({
        name: name,
        webhook: webhook,
        qr: "",
      } as Session);
    }

    const entry: SessionClient = new SessionClient(session);
    this.registry.set(name, entry);
    await entry.start();
  }

  get(name: string) {
    return this.registry.get(name);
  }

  async stopClient(name: string): Promise<boolean> {
    const entry = this.get(name);

    if (!entry) {
      return false;
    }

    await entry.stop();

    return true;
  }
}
