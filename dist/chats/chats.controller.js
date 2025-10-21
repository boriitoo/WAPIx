"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getChats = void 0;
const tsyringe_1 = require("tsyringe");
const client_registery_1 = require("../client.registery");
const chat_1 = require("../chats/chat");
const logger_1 = require("../logger");
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    if (!name) {
        return res.status(400).json({ error: "Session name is required" });
    }
    const registry = tsyringe_1.container.resolve(client_registery_1.ClientRegistry);
    const client = registry.get(name);
    if (!client) {
        return res.status(404).json({ error: "Client not found." });
    }
    if (!client.connected) {
        return res.status(401).json({ error: "Client not connected" });
    }
    const chats = yield client.client.getChats();
    res.json(chats.map((chat) => chat_1.Chat.of(chat)));
});
exports.getChats = getChats;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const { message, chatId } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    if (!message || !chatId) {
        return res.status(400).json({ error: "Message and chatId is required" });
    }
    const registry = tsyringe_1.container.resolve(client_registery_1.ClientRegistry);
    const client = registry.get(name);
    if (!client) {
        return res.status(404).json({ error: "Client not found" });
    }
    if (!client.connected) {
        return res.status(401).json({ error: "Client not connected" });
    }
    logger_1.logger.info(`Trying to send message to ${chatId} with ${message}`);
    yield client.client.sendMessage(chatId, message);
    return res.status(200).json();
});
exports.sendMessage = sendMessage;
