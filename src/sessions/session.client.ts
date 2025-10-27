import { Client, LocalAuth, Message, WAState } from "whatsapp-web.js";
import { Session } from "@/sessions/session";
import { WebhookSender } from "@/webhook-sender";
import { SessionsService } from "@/sessions/sessions.service";
import { container } from "tsyringe";
import { logger } from "@/logger";
import { Message as InternalMessage } from "@/models/message";
import Bull from "bull";
import { clearInterval } from "node:timers";

export class SessionClient {
  private readonly session: Session;
  private readonly wwebClient: Client;
  private readonly webhookSender: WebhookSender;
  private readonly service: SessionsService =
    container.resolve(SessionsService);
  private interval: NodeJS.Timeout;
  private readonly _queue: Bull.Queue;

  constructor(session: Session) {
    this.session = session;
    this.wwebClient = new Client({
      puppeteer: {
        headless: true,
        args: ["--no-sandbox"],
      },
      authStrategy: new LocalAuth({ clientId: session.name }),
    });
    this.webhookSender = new WebhookSender(session.webhook);
    this._queue = new Bull(this.session.name, {
      limiter: {
        max: 1,
        duration: 500,
      },
      redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });
    this.registerListeners();
  }

  public async start(): Promise<void> {
    this.interval = setInterval(async () => {
      const current = await this.isConnected();

      if (!current) {
        return;
      }

      await this.notifyHealthCheck();
    }, 10 * 1000);
    this.wwebClient.initialize().then();
  }

  public async stop(): Promise<void> {
    if (this.interval) {
      clearInterval(this.interval);
    }

    await this.wwebClient.destroy();
  }

  public async isConnected(): Promise<boolean> {
    const state = await this.wwebClient.getState();
    return state === WAState.CONNECTED;
  }

  private registerListeners() {
    this.wwebClient.on("qr", this.onQrCodeReceived.bind(this));

    this.wwebClient.on("ready", async () => {
      logger.info(`Client with name ${this.session.name} ready`);
    });

    this.wwebClient.on("message", this.onMessageReceived.bind(this));

    this.wwebClient.on("disconnect", async () => {
      logger.info(`Client with name ${this.session.name} disconnected`);
    });

    this.wwebClient.on("change_state", async (state) => {
      logger.info(`Received new state ${state}`);
    });

    this.queue.process(async (job: any) => {
      console.log(job);
    });
  }

  private async onMessageReceived(message: Message) {
    const converted = InternalMessage.of(message);
    await this.webhookSender.send(converted);
  }

  private async onQrCodeReceived(qr: string) {
    await this.service.updateQRCodeByName(this.session.name, qr);
  }

  private async notifyHealthCheck(): Promise<void> {
    const session = await this.service.getByName(this.session.name);

    if (!session) {
      return;
    }

    session.lastSeenAt = new Date();
    await this.service.save(session);
  }

  get queue() {
    return this._queue;
  }

  get client() {
    return this.wwebClient;
  }
}
