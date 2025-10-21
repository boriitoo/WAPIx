import { Client, LocalAuth } from "whatsapp-web.js";
import { SessionsService } from "@/sessions/sessions.service";
import { Session } from "@/sessions/session";

export class ClientRegistry {
  private static registry: Map<
    String,
    { client: Client; connected: boolean; qr: string }
  > = new Map();
  private static service: SessionsService = new SessionsService();

  static async init(): Promise<void> {
    console.log("Initializing existing sessions.");
    const sessions = await this.service.list();
    for (const session of sessions) {
      await this.startClient(session.name, session.webhook);
    }
  }

  static async startClient(name: string, webhook: string): Promise<void> {
    if (this.registry.has(name)) {
      console.log(`Registry with name ${name} already started.`);
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
      authStrategy: new LocalAuth({ clientId: name }),
    });

    const entry = { client: client, connected: false, qr: "" };
    this.registry.set(name, entry);

    client.on("qr", async (qr: string) => {
      entry.qr = qr;
      await this.service.updateQRCodeByName(name, qr);
    });

    client.on("ready", async () => {
      console.log(`Client ${name} is ready!`);
      await this.service.updateConnectivityByName(name, true);
      entry.connected = true;
    });

    client.on("disconnect", async () => {
      console.log(`Client ${name} is disconnected!`);
      await this.service.updateConnectivityByName(name, false);
      entry.connected = false;
    });

    client.initialize();
  }

  static get(name: string) {
    return this.registry.get(name);
  }

  static async stopClient(name: string): Promise<boolean> {
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
