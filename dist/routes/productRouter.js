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
const db_1 = require("../models/db");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, quantidade } = req.body;
    const db = (0, db_1.getDb)();
    yield db.run('INSERT INTO products (name,price, description, quantidade) VALUES (?,?,?,?)', [name, price, description, quantidade]);
    res.status(201).json({ message: "Produto adicionado com sucesso" });
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const products = yield db.all('SELECT * FROM products');
    res.json(products);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const db = (0, db_1.getDb)();
    try {
        yield db.run('DELETE FROM products WHERE id = ?', [id]);
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
}));
exports.default = router;
