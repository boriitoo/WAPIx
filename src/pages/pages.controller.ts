import { Request, Response } from "express";
import { container } from "tsyringe";
import { SessionsService } from "@/sessions/sessions.service";
import { Session } from "node:inspector";
import { format } from "timeago.js";

export const getHomePage = async (req: Request, res: Response) => {
  const service = container.resolve(SessionsService);
  const sessions = await service.list();
  return res.render("home", {
    layout: "main",
    title: "WAPIx Home",
    sessions: sessions.map((session) => {
      return {
        id: session.id,
        name: session.name,
        webhook: session.webhook,
        isActive: session.isActive,
        lastSeen: format(session.lastSeenAt, "nl"),
      };
    }),
  });
};

export const newSessionPage = async (req: Request, res: Response) => {
  return res.render("sessions/new", { layout: "main" });
};

export const getQrPage = async (req: Request, res: Response) => {
  const { name } = req.params;

  const service = container.resolve(SessionsService);
  const session = await service.getByName(name);

  if (!session) {
    return res.status(404).send("No such session");
  }

  return res.render("sessions/qr", {
    layout: "main",
    sessionName: session.name,
    isConnected: session.isActive,
  });
};

export const getDetailPage = async (req: Request, res: Response) => {
  const service = container.resolve(SessionsService);
  const session = await service.getByName(req.params.name);
  if (!session) {
    return res.status(404).send("No such session");
  }

  return res.render("sessions/detail", {
    layout: "main",
    sessionName: session.name,
    isConnected: session.isActive,
    logs: [],
  });
};
