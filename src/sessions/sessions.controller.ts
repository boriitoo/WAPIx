import { Request, Response, NextFunction } from "express";
import { ClientRegistry } from "@/client.registery";
import {SessionsService} from "@/sessions/sessions.service";

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { sessionName, webhookUrl } = req.body;

  if (!sessionName || !webhookUrl) {
    return res
      .status(400)
      .json({ error: "sessionName and webhookUrl are required" });
  }

  await ClientRegistry.startClient(sessionName, webhookUrl);

  res.json({
    message: "Session created successfully",
    sessionName,
    webhookUrl,
  });
};

export const getSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ error: "Session name is required" });
  }

  const service = new SessionsService();
  const session = await service.getByName(name);

  if (!session) {
      return res.status(404).json({error: "Session not found"});
  }

  res.json(session);
};
