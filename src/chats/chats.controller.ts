import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ClientRegistry } from "@/client.registery";
import { Chat } from "@/chats/chat";
import { logger } from "@/logger";

export const getChats = async (req: Request, res: Response) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ error: "Session name is required" });
  }

  const registry = container.resolve(ClientRegistry);
  const client = registry.get(name);

  if (!client) {
    return res.status(404).json({ error: "Client not found." });
  }

  if (!client.connected) {
    return res.status(401).json({ error: "Client not connected" });
  }

  const chats = await client.client.getChats();
  res.json(chats.map((chat) => Chat.of(chat)));
};

export const sendMessage = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { message, chatId } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!message || !chatId) {
    return res.status(400).json({ error: "Message and chatId is required" });
  }

  const registry = container.resolve(ClientRegistry);
  const client = registry.get(name);

  if (!client) {
    return res.status(404).json({ error: "Client not found" });
  }

  if (!client.connected) {
    return res.status(401).json({ error: "Client not connected" });
  }

  logger.info(`Trying to send message to ${chatId} with ${message}`);
  await client.client.sendMessage(chatId, message);
  return res.status(200).json();
};
