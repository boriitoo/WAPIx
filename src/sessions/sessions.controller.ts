import { Request, Response, NextFunction } from "express";
import { ClientRegistry } from "@/client.registery";
import { SessionsService } from "@/sessions/sessions.service";
import { container } from "tsyringe";
import QRCode from "qrcode";

export const createSession = async (req: Request, res: Response) => {
  const { sessionName, webhookUrl } = req.body;

  if (!sessionName || !webhookUrl) {
    return res
      .status(400)
      .json({ error: "sessionName and webhookUrl are required" });
  }

  const clientRegistry = container.resolve(ClientRegistry);
  await clientRegistry.startClient(sessionName, webhookUrl);

  res.json({
    message: "Session created successfully",
    sessionName,
    webhookUrl,
  });
};

export const getSession = async (req: Request, res: Response) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ error: "Session name is required" });
  }

  const service = container.resolve(SessionsService);
  const session = await service.getByName(name);

  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  res.json(session);
};

export const getQrCode = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { format = "json" } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Session name is required" });
  }

  const service = container.resolve(SessionsService);
  const session = await service.getByName(name);

  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  switch (format) {
    case "json":
      res.json({ qr: session.qr });
      break;
    case "html":
      const qrCodeDataUrl = await QRCode.toDataURL(session.qr);
      res.send(`<img src="${qrCodeDataUrl}" alt="QR Code"/>`);
      break;
    default:
      res.status(500).json({ error: `Unsupported format ${format}.` });
  }
};

export const getSessions = async (req: Request, res: Response) => {
  const service = container.resolve(SessionsService);
  const sessions = await service.list();

  return res.json(sessions);
};

export const deleteSession = async (req: Request, res: Response) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ error: "Session name is required" });
  }

  const clientRegistry = container.resolve(ClientRegistry);
  const succeed = await clientRegistry.stopClient(name);

  if (!succeed) {
    return res.status(500).json({ error: "Unable to stop client" });
  }

  return res.status(200).json({});
};
