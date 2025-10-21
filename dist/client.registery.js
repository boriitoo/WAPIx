"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRegistry = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const sessions_service_1 = require("./sessions/sessions.service");
const tsyringe_1 = require("tsyringe");
let ClientRegistry = class ClientRegistry {
    constructor(service) {
        this.service = service;
        this.registry = new Map();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Initializing existing sessions.");
            const sessions = yield this.service.list();
            for (const session of sessions) {
                yield this.startClient(session.name, session.webhook);
            }
        });
    }
    startClient(name, webhook) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.registry.has(name)) {
                console.log(`Registry with name ${name} already started.`);
                return;
            }
            let session = yield this.service.getByName(name);
            if (!session) {
                session = yield this.service.save({
                    name: name,
                    webhook: webhook,
                    qr: "",
                });
            }
            const client = new whatsapp_web_js_1.Client({
                authStrategy: new whatsapp_web_js_1.LocalAuth({ clientId: name }),
            });
            const entry = { client: client, connected: false, qr: "" };
            this.registry.set(name, entry);
            client.on("qr", (qr) => __awaiter(this, void 0, void 0, function* () {
                entry.qr = qr;
                yield this.service.updateQRCodeByName(name, qr);
            }));
            client.on("ready", () => __awaiter(this, void 0, void 0, function* () {
                console.log(`Client ${name} is ready!`);
                yield this.service.updateConnectivityByName(name, true);
                entry.connected = true;
            }));
            client.on("disconnect", () => __awaiter(this, void 0, void 0, function* () {
                console.log(`Client ${name} is disconnected!`);
                yield this.service.updateConnectivityByName(name, false);
                entry.connected = false;
            }));
            client.initialize();
        });
    }
    get(name) {
        return this.registry.get(name);
    }
    stopClient(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = this.get(name);
            if (!entry) {
                return false;
            }
            yield entry.client.destroy();
            this.registry.delete(name);
            yield this.service.deleteByName(name);
            return true;
        });
    }
};
exports.ClientRegistry = ClientRegistry;
exports.ClientRegistry = ClientRegistry = __decorate([
    (0, tsyringe_1.injectable)(),
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)(sessions_service_1.SessionsService)),
    __metadata("design:paramtypes", [sessions_service_1.SessionsService])
], ClientRegistry);
