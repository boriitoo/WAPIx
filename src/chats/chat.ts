import { Chat as WhatsappChat } from "whatsapp-web.js";

export class Chat {
  readonly id: string;
  readonly name: string;
  readonly isGroup: boolean;
  readonly archived: boolean;

  constructor(chat: WhatsappChat) {
    this.id = chat.id._serialized;
    this.name = chat.name;
    this.isGroup = chat.isGroup;
    this.archived = chat.archived;
  }

  /**
   * Factory method to create a Chat instance from the raw WhatsApp chat object.
   * @param rawChat The raw chat object from the API.
   * @returns A new Chat instance.
   */
  public static of(rawChat: WhatsappChat): Chat {
    return new Chat(rawChat);
  }
}
