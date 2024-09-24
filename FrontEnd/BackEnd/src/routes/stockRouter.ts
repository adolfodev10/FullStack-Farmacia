// routes/stockRouter.ts
import express from 'express';
import { getDb } from '../models/db';

const stockRouter = express.Router();

// Listar todos os produtos em estoque
stockRouter.get('/', async (req, res) => {
    try {
        const db = getDb();
        const products = await db.all('SELECT * FROM products');
        res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao listar produtos em estoque:', error);
        res.status(500).json({ message: 'Erro ao listar produtos em estoque.' });
    }
});

// Adicionar um novo produto ao estoque
stockRouter.post('/', async (req, res) => {
    const { name, price, description} = req.body;
    if (!name || !price || !description) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const db = getDb();
        await db.run(
            'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
            [name, price, description]
        );
        res.status(201).json({ message: 'Produto adicionado com sucesso ao estoque!' });
    } catch (error) {
        console.error('Erro ao adicionar produto ao estoque:', error);
        res.status(500).json({ message: 'Erro ao adicionar produto ao estoque.' });
    }
});

// Atualizar a quantidade de um produto no estoque
stockRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {name, price, description} = req.body;
    try {
        const db = getDb();
        const result = await db.run('UPDATE products SET name = ?, price = ? AND description = ? WHERE id = ?', [name,price,description,id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar o produto.' });
    }
});

// Remover um produto do estoque
stockRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = getDb();
        const result = await db.run('DELETE FROM products WHERE id = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Produto removido com sucesso!' });
    } catch (error) {
        console.error('Erro ao remover produto do estoque:', error);
        res.status(500).json({ message: 'Erro ao remover produto do estoque.' });
    }
});

export default stockRouter;
