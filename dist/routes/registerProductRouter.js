"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../models/db");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { name, price, quantity, description } = req.body;
    const db = await (0, db_1.getDb)();
    await db.run('INSERT INTO registerProduct (name, price, quantity, description) VALUES (?,?,?,?)', [name, price, quantity, description]);
    res.status(201).json({ message: "Produto Adicionado com sucesso" });
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, description } = req.body;
    if (!name || !price || !quantity || !description) {
        return res.status(400).json({ message: 'Coloque todos os dados do produto para ser atualizado' });
    }
    try {
        const db = await (0, db_1.getDb)();
        const result = await db.run('UPDATE registerProduct SET name = ?, price = ?, quantity = ?, description = ? WHERE id = ?', [name, price, quantity, description, id]);
        if (result && result.changes && result.changes > 0) {
            res.status(200).json({ message: 'Produto atualizado com sucesso' });
        }
        else {
            res.status(404).json({ message: 'Erro ao atualizar produto' });
        }
    }
    catch (error) {
        console.error('Erro ao atualizar produto', error);
        res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
});
router.get('/', async (req, res) => {
    try {
        const db = await (0, db_1.getDb)();
        const products = await db.all('SELECT * FROM registerProduct');
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Erro ao listar produto', error);
        res.status(500).send('Erro ao listar produto');
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await (0, db_1.getDb)();
        await db.run('DELETE FROM registerProduct WHERE id = ?', [id]);
        res.status(200).json({ message: 'Produto Eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro', error });
    }
});
exports.default = router;
