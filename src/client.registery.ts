import { Client, LocalAuth, Message } from "whatsapp-web.js";
import { SessionsService } from "@/sessions/sessions.service";
import { Session } from "@/sessions/session";
import { inject, injectable, singleton } from "tsyringe";
import { logger } from "@/logger";
import { WebhookSender } from "@/webhook-sender";
import { Message as InternalMessage } from "@/models/message";

@injectable()
@singleton()
export class ClientRegistry {
  private readonly registry: Map<
    String,
    { client: Client; connected: boolean; qr: string }
  > = new Map();

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

    const client = new Client({
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--no-first-run",
          "--no-zygote",
          "--single-process",
        ],
      },
      authStrategy: new LocalAuth({ clientId: name }),
    });

    const entry = { client: client, connected: false, qr: "" };
    this.registry.set(name, entry);

    client.on("qr", async (qr: string) => {
      entry.qr = qr;
      await this.service.updateQRCodeByName(name, qr);
    });

    client.on("ready", async () => {
      logger.info(`Client with name ${name} ready`);
      await this.service.updateConnectivityByName(name, true);
      entry.connected = true;
    });

    client.on("message", async (message: Message) => {
      const webhookSender = new WebhookSender(webhook);
      await webhookSender.send(InternalMessage.of(message));
    });

    client.on("disconnect", async () => {
      logger.info(`Client with name ${name} disconnected`);
      await this.service.updateConnectivityByName(name, false);
      entry.connected = false;
    });

    client.initialize();
  }

  get(name: string) {
    return this.registry.get(name);
  }

  async stopClient(name: string): Promise<boolean> {
    const entry = this.get(name);

    if (!entry) {
      return false;
    }

    await entry.client.destroy();
    this.registry.delete(name);
    await this.service.deleteByName(name);

    return true;
  }
}
