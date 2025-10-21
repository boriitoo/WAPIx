import { Request, Response, NextFunction } from "express";
import { ClientRegistry } from "@/client.registery";

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
