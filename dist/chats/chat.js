"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
class Chat {
  constructor(chat) {
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
  static of(rawChat) {
    return new Chat(rawChat);
  }
}
exports.Chat = Chat;
