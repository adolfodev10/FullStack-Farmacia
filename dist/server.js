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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const db_1 = require("./models/db");
require("source-map-support/register");
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const funcaoRoutes_1 = __importDefault(require("./routes/funcaoRoutes"));
const stockRouter_1 = __importDefault(require("./routes/stockRouter")); // Importa o novo router
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api/users', userRouter_1.default);
app.use('/api/login', loginRoutes_1.default);
app.use('/api/funcao', funcaoRoutes_1.default);
app.use('/api/products', productRouter_1.default);
app.use('/api/stock', stockRouter_1.default); // Adiciona o router de estoque
app.post('/api/clients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameClient, telefone } = req.body;
    if (!nameClient) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    // if(!telefone){
    //     return res.status(400).json({ message:'Cliente sem telefone'})
    // }
    try {
        const db = (0, db_1.getDb)();
        yield db.run('INSERT INTO clients (nameClient, telefone) VALUES (?,?)', [nameClient, telefone]);
        res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
    }
    catch (error) {
        console.error('Error ao cadastrar cliente', error);
        res.status(500).json({ message: 'Erro ao cadastrar cliente' });
    }
}));
app.get('/api/clients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, db_1.getDb)();
        const clients = yield db.all('SELECT * FROM clients');
        res.status(200).json(clients);
    }
    catch (error) {
        console.error('Erro ao listar clientes', error);
        res.status(500).send('Erro ao listar clientes');
    }
}));
app.delete('/api/clients/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const db = (0, db_1.getDb)();
    try {
        yield db.run('DELETE FROM clients WHERE id = ?', [id]);
        if (id) {
            res.status(200).json({ message: 'Cliente Eliminado' });
        }
        else {
            res.status(501).json({ message: 'Cliente Inexistente' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erro', error });
    }
}));
app.put('/api/clients/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nameClient, telefone } = req.body;
    if (!nameClient || !telefone) {
        return res.status(400).json({ message: 'Nome e telefone são obrigatórios' });
    }
    try {
        const db = (0, db_1.getDb)();
        const result = yield db.run('UPDATE clients SET nameClient = ?, telefone = ? WHERE id = ?', [nameClient, telefone, id]);
        // Verifica se result e result.changes estão definidos
        if (result && result.changes && result.changes > 0) {
            res.status(200).json({ message: 'Cliente atualizado com sucesso' });
        }
        else {
            res.status(404).json({ message: 'Cliente não encontrado ou nenhuma alteração foi feita' });
        }
    }
    catch (error) {
        console.error('Erro ao atualizar cliente', error);
        res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
}));
app.get('/api/registerProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, db_1.getDb)();
        const registerProduct = yield db.run("SELECT * FROM registerProduct");
        res.status(200).json(registerProduct);
    }
    catch (error) {
        console.error("Erro ao listar produto", error);
        res.status(500).send('Erro ao listar produto');
    }
}));
app.post('/api/registerProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameProduct, price, description, quantity } = req.body;
    if (!nameProduct || !price || !description || !quantity) {
        return res.status(400).json({ message: "Preencha Tudo!" });
    }
    try {
        const db = (0, db_1.getDb)();
        yield db.run(`INSERT INTO (nameProduct, price, description, quantity) VALUES (?,?,?,?)`, [nameProduct, price, description, quantity]);
        res.status(200).json({ message: "Produto adicionado com sucesso!" });
    }
    catch (error) {
        console.error('Erro ao cadastrar produto', error);
        res.status(500).json('Erro ao cadastrar produto');
    }
}));
app.get('/api/venda', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, db_1.getDb)();
        const venda = yield db.all('SELECT * FROM venda');
        res.status(200).json(venda);
    }
    catch (error) {
        console.error("Erro ao listar produto vendido", error);
        res.status(500).send('Erro ao listar Produto Vendido');
    }
}));
app.delete('/api/venda/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const db = (0, db_1.getDb)();
    try {
        yield db.run('DELETE FROM venda WHERE id = ?', [id]);
        if (id) {
            res.status(200).json({ message: 'Venda ou produto Eliminado' });
        }
        else {
            res.status(501).json({ message: 'Venda inexistente' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erro', error });
    }
}));
app.post('/api/venda', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameClient, name, price, description, quantidade, date } = req.body;
    if (!nameClient || !name || !price || !description || !quantidade || !date) {
        return res.status(400).json({ message: "Preencha Tudo!" });
    }
    try {
        const db = (0, db_1.getDb)();
        yield db.run('INSERT INTO (nameClient, name, price, description, quantidade, date) VALUES(?,?,?,?,?,?)', [nameClient, name, price, description, quantidade, date]);
    }
    catch (error) {
        console.error('Error ao vender', error);
        res.status(500).json({ message: 'Erro ao vender' });
    }
}));
app.post('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, quantidade, client_id } = req.body;
    if (!name || !price || !description || !quantidade || !client_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const db = (0, db_1.getDb)();
        const { lastID: productId } = yield db.run('INSERT INTO products (name, price, description, quantidade, client_id) VALUES (?, ?, ?, ?, ?)', [name, price, description, quantidade, client_id]);
        let invoice = yield db.get('SELECT * FROM invoices WHERE client_id = ? AND date = ?', [client_id, new Date().toISOString().split('T')[0]]);
        if (!invoice) {
            const { lastID: invoiceId } = yield db.run('INSERT INTO invoices (client_id, date) VALUES (?, ?)', [client_id, new Date().toISOString().split('T')[0]]);
            invoice = { id: invoiceId };
        }
        yield db.run('INSERT INTO invoice_items (invoice_id, product_id, quantidade) VALUES (?, ?, ?)', [invoice.id, productId, quantidade]);
        res.status(201).json({ message: 'Produto Adicionado e Fatura atualizada com sucesso' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar produto e atualizar fatura' });
    }
}));
app.get('/api/invoices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, db_1.getDb)();
        const invoices = yield db.all('SELECT * FROM invoices');
        res.status(200).json(invoices);
    }
    catch (error) {
        console.error('Erro ao listar faturas:', error);
        res.status(500).json({ message: 'Erro ao listar faturas.' });
    }
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Servidor rodando na porta : ${port}`);
    yield (0, db_1.openDb)();
}));
