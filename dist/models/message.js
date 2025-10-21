"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(whatsappMessage) {
        this.id = whatsappMessage.id._serialized;
        this.body = whatsappMessage.body;
        this.isForward = whatsappMessage.isForwarded;
        this.from = whatsappMessage.from;
    }
    static of(whatsappMessage) {
        return new Message(whatsappMessage);
    }
}
exports.Message = Message;
