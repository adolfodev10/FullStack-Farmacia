"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../models/db");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const { funcao } = req.body;
    try {
        const bd = await (0, db_1.getDb)();
        const user = await bd.run('SELECT * FROM users WHERE funcao = ?', [funcao]);
        if (user === funcao) {
            res.status(200).json({ message: "Todos Gerentes na tabela" });
        }
        else {
            res.status(401).json({ message: "Função desconhecida" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao pesquisar funcao" });
    }
});
router.get('/', async (req, res) => {
    const db = await (0, db_1.getDb)();
    const users = await db.all('SELECT * FROM users');
    res.json(users);
});
exports.default = router;
