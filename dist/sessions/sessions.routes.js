"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessions_controller_1 = require("../sessions/sessions.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Session
 *   description: WhatsApp session management
 */
/**
 * @swagger
 * /api/sessions:
 *   post:
 *     tags: [Session]
 *     summary: Create a new WhatsApp session
 *     description: This endpoint creates and starts a new WhatsApp session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionName
 *               - webhookUrl
 *             properties:
 *               sessionName:
 *                 type: string
 *                 example: "mySession"
 *               webhookUrl:
 *                 type: string
 *                 example: "https://example.com/webhook"
 *     responses:
 *       200:
 *         description: Session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session created successfully
 *                 sessionName:
 *                   type: string
 *                   example: mySession
 *                 webhookUrl:
 *                   type: string
 *                   example: https://example.com/webhook
 *       400:
 *         description: Missing sessionName or webhookUrl
 */
router.post("/", sessions_controller_1.createSession);
/**
 * @swagger
 * /api/sessions/{name}:
 *   get:
 *     tags: [Session]
 *     summary: Get WhatsApp session by name
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Name of the session to retrieve
 *         schema:
 *           type: string
 *           example: mySession
 *     responses:
 *       200:
 *         description: Session details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Session name is required
 *       404:
 *         description: Session not found
 */
router.get("/:name", sessions_controller_1.getSession);
/**
 * @swagger
 * /api/sessions/{name}/qr:
 *   get:
 *     tags: [Session]
 *     summary: Get QR code for WhatsApp session authentication
 *     description: Returns a QR code (in JSON or image format) for session authentication.
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Name of the session
 *         schema:
 *           type: string
 *           example: mySession
 *       - name: format
 *         in: query
 *         required: false
 *         description: Response format (`json` or `html`)
 *         schema:
 *           type: string
 *           enum: [json, html]
 *           example: json
 *     responses:
 *       200:
 *         description: QR code retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 qr:
 *                   type: string
 *                   description: Base64 encoded QR code
 *       400:
 *         description: Session name is required
 */
router.get("/:name/qr", sessions_controller_1.getQrCode);
exports.default = router;
