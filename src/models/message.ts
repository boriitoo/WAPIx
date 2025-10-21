import { Message as WhatsappMessage } from "whatsapp-web.js";

export class Message {
  readonly id: string;
  readonly body: string;
  readonly isForward: boolean;
  readonly from: string;

  constructor(whatsappMessage: WhatsappMessage) {
    this.id = whatsappMessage.id._serialized;
    this.body = whatsappMessage.body;
    this.isForward = whatsappMessage.isForwarded;
    this.from = whatsappMessage.from;
  }

  static of(whatsappMessage: WhatsappMessage) {
    return new Message(whatsappMessage);
  }
}
