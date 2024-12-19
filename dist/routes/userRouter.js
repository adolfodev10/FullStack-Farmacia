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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../models/db"); // Função para obter conexão com o banco de dados
const stockRouter = (0, express_1.Router)();
// Listar todos os produtos em estoque
stockRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, db_1.getDb)();
        const users = yield db.all('SELECT * FROM users');
        res.json(users);
    }
    catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
}));
// Adicionar um novo produto ao estoque
stockRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, funcao, senha } = req.body;
    if (!name || !funcao || !senha) {
        return res.status(400).json({ message: 'Nome, função e senha são obrigatórios' });
    }
    try {
        const db = (0, db_1.getDb)();
        yield db.run('INSERT INTO users (name,funcao,senha) VALUES ( ?, ?, ?)', [name, funcao, senha]);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
}));
// Atualizar um produto existente no estoque
stockRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, funcao, senha } = req.body; // Atualiza também o preço
    if (name === undefined || funcao === undefined || senha === undefined) {
        return res.status(400).json({ message: 'Nome, função e senha são obrigatórios' });
    }
    try {
        const db = (0, db_1.getDb)();
        const result = yield db.run('UPDATE users SET name = ?, funcao = ?, senha = ? WHERE id = ?', [name, funcao, senha, id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
}));
// Remover um produto do estoque
stockRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const db = (0, db_1.getDb)();
        const result = yield db.run('DELETE FROM users WHERE id = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário removido com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao remover usuário:', error);
        res.status(500).json({ message: 'Erro ao remover usuário.' });
    }
}));
exports.default = stockRouter;
