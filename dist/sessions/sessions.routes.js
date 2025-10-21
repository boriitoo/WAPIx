"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessions_controller_1 = require("../sessions/sessions.controller");
const router = (0, express_1.Router)();
router.post("/", sessions_controller_1.createSession);
router.get("/:name", sessions_controller_1.getSession);
exports.default = router;
