"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../models/db");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, senha } = req.body;
    if (!name || !senha) {
        return res.status(400).json({ message: 'Nome e senha são obrigatórios' });
    }
    try {
        const db = (0, db_1.getDb)();
        const user = yield db.get('SELECT * FROM users WHERE name = ?', [name]);
        if (user && user.senha === senha) {
            res.status(200).json({ message: "Login bem-sucedido" });
        }
        else {
            res.status(401).json({ message: 'Nome ou senha incorretos' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const db = (0, db_1.getDb)();
    const users = yield db.all('SELECT * FROM users WHERE name = ?', [name]);
    res.json(users);
}));
exports.default = router;
