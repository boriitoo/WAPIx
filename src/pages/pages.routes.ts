import { Router } from "express";
import {
  getDetailPage,
  getHomePage,
  getQrPage,
  newSessionPage,
} from "@/pages/pages.controller";

const router = Router();

router.get("/", getHomePage);
router.get("/sessions/new", newSessionPage);
router.get("/sessions/:name/qr", getQrPage);
router.get("/sessions/:name", getDetailPage);

export default router;
