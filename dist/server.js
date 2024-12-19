"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const db_1 = require("./models/db");
require("source-map-support/register");
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const funcaoRoutes_1 = __importDefault(require("./routes/funcaoRoutes"));
const stockRouter_1 = __importDefault(require("./routes/stockRouter"));
const registerProductRouter_1 = __importDefault(require("./routes/registerProductRouter"));
const clientsRouter_1 = __importDefault(require("./routes/clientsRouter"));
const vendaRouter_1 = __importDefault(require("./routes/vendaRouter"));
const app = (0, express_1.default)();
const cors = require('cors');
const port = process.env.API_PORT || 5000;
app.use(cors());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use('/api/users', userRouter_1.default);
app.use('/api/login', loginRoutes_1.default);
app.use('/api/funcao', funcaoRoutes_1.default);
app.use('/api/products', productRouter_1.default);
app.use('/api/stock', stockRouter_1.default);
app.use("/api/registerProduct", registerProductRouter_1.default);
app.use('/api/clients', clientsRouter_1.default);
app.use("/api/venda", vendaRouter_1.default);
app.post('/api/products', async (req, res) => {
    const { name, price, quantiity, description, client_id } = req.body;
    if (!name || !price || !quantiity || !description || !client_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const db = await (0, db_1.getDb)();
        const { lastID: productId } = await db.run('INSERT INTO products (name, price, quantity, description, client_id) VALUES (?, ?, ?, ?, ?)', [name, price, quantiity, description, client_id]);
        let invoice = await db.get('SELECT * FROM invoices WHERE client_id = ? AND date = ?', [client_id, new Date().toISOString().split('T')[0]]);
        if (!invoice) {
            const { lastID: invoiceId } = await db.run('INSERT INTO invoices (client_id, date) VALUES (?, ?)', [client_id, new Date().toISOString().split('T')[0]]);
            invoice = { id: invoiceId };
        }
        await db.run('INSERT INTO invoice_items (invoice_id, product_id) VALUES (?, ?)', [invoice.id, productId]);
        res.status(201).json({ message: 'Produto Adicionado e Fatura atualizada com sucesso' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar produto e atualizar fatura' });
    }
});
app.get('/api/invoices', async (req, res) => {
    try {
        const db = await (0, db_1.getDb)();
        const invoices = await db.all('SELECT * FROM invoices');
        res.status(200).json(invoices);
    }
    catch (error) {
        console.error('Erro ao listar faturas:', error);
        res.status(500).json({ message: 'Erro ao listar faturas.' });
    }
});
app.listen(port, async () => {
    console.log(`Servidor rodando na porta : ${port}`);
    await (0, db_1.openDb)();
});
