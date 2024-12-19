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
// routes/stockRouter.ts
const express_1 = __importDefault(require("express"));
const db_1 = require("../models/db");
const stockRouter = express_1.default.Router();
// Listar todos os produtos em estoque
stockRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, db_1.getDb)();
        const products = yield db.all('SELECT * FROM products');
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Erro ao listar produtos em estoque:', error);
        res.status(500).json({ message: 'Erro ao listar produtos em estoque.' });
    }
}));
// Adicionar um novo produto ao estoque
stockRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, quantidade } = req.body;
    if (!name || !price || !description || quantidade === -1) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const db = (0, db_1.getDb)();
        yield db.run('INSERT INTO products (name, price, description, quantidade) VALUES (?, ?, ?, ?)', [name, price, description, quantidade]);
        res.status(201).json({ message: 'Produto adicionado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao adicionar produto ao estoque:', error);
        res.status(500).json({ message: 'Erro ao adicionar produto ao estoque.' });
    }
}));
// Atualizar a quantidade de um produto no estoque
stockRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { quantidade } = req.body;
    if (quantidade === undefined) {
        return res.status(400).json({ message: 'Quantidade é obrigatória' });
    }
    try {
        const db = (0, db_1.getDb)();
        const result = yield db.run('UPDATE products SET quantidade = ? WHERE id = ?', [quantidade, id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Quantidade atualizada com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao atualizar quantidade do produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar quantidade do produto.' });
    }
}));
// Remover um produto do estoque
stockRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const db = (0, db_1.getDb)();
        const result = yield db.run('DELETE FROM products WHERE id = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Produto removido com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao remover produto do estoque:', error);
        res.status(500).json({ message: 'Erro ao remover produto do estoque.' });
    }
}));
exports.default = stockRouter;
