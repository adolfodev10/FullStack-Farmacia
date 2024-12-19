"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../models/db");
const vendaRouter = express_1.default.Router();
vendaRouter.get('/', async (req, res) => {
    try {
        const db = await (0, db_1.getDb)();
        const venda = await db.all('SELECT * FROM venda');
        res.status(200).json(venda);
    }
    catch (error) {
        console.error('Erro ao listar produto vendido', error);
        res.status(500).send('Erro ao listar Produto Vendido');
    }
});
vendaRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await (0, db_1.getDb)();
        await db.run('DELETE FROM venda WHERE id = ?', [id]);
        res.status(200).json({ message: 'Venda ou produto Eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro', error });
    }
});
vendaRouter.post('/', async (req, res) => {
    const { name, price, quantity, description } = req.body;
    if (!name || !price || !quantity || !description) {
        return res.status(400).json({ message: 'Preencha Tudo!' });
    }
    const date = new Date().toLocaleString('PT-AO');
    try {
        const db = await (0, db_1.getDb)();
        await db.run('INSERT INTO venda (name, price, quantity, description, date) VALUES (?,?,?,?,?)', [name, price, quantity, description, date]);
        res.status(200).json({ message: 'Produto vendido com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao vender', error);
        res.status(500).json({ message: 'Erro ao vender' });
    }
});
exports.default = vendaRouter;
