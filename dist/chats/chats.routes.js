"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chats_controller_1 = require("../chats/chats.controller");
const router = (0, express_1.Router)();
router.get("/:name/chats", chats_controller_1.getChats);
exports.default = router;
