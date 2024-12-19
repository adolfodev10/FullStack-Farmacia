"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../models/db");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { name, price, quantity, description } = req.body;
    const db = await (0, db_1.getDb)();
    await db.run('INSERT INTO products (name,price, quantity,description) VALUES (?,?,?,?)', [name, price, quantity, description]);
    res.status(201).json({ message: "Produto adicionado com sucesso" });
});
router.get('/', async (req, res) => {
    const db = await (0, db_1.getDb)();
    const products = await db.all('SELECT * FROM products');
    res.json(products);
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await (0, db_1.getDb)();
    try {
        await db.run('DELETE FROM products WHERE id = ?', [id]);
        if (id) {
            res.status(200).json({ message: 'Produto Eliminado' });
        }
        else {
            res.status(501).json({ message: 'Produto Inexistente' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erro', error });
    }
});
exports.default = router;
