"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../models/db");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const { name, senha } = req.body;
    if (!name || !senha) {
        return res.status(400).json({ message: 'Nome e senha são obrigatórios' });
    }
    try {
        const db = await (0, db_1.getDb)();
        const user = await db.get('SELECT * FROM users WHERE name = ?', [name]);
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
});
router.get('/', async (req, res) => {
    const { name } = req.body;
    const db = await (0, db_1.getDb)();
    const users = await db.all('SELECT * FROM users WHERE name = ?', [name]);
    res.json(users);
});
exports.default = router;
