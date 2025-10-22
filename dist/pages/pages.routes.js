"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pages_controller_1 = require("../pages/pages.controller");
const router = (0, express_1.Router)();
router.get("/", pages_controller_1.getHomePage);
router.get("/sessions/new", pages_controller_1.newSessionPage);
router.get("/sessions/:name/qr", pages_controller_1.getQrPage);
exports.default = router;
