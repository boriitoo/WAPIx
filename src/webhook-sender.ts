import axios from "axios";
import { logger } from "@/logger";

export class WebhookSender {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async send(json: object): Promise<void> {
    logger.info(`Sending webhook on ${this.url}`);
    try {
      await axios.post(this.url, json);
    } catch (error) {
      logger.error(`Error while trying to send webhook ${error}`);
    }
  }
}
