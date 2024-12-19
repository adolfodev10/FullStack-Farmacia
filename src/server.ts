import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter';
import { getDb, openDb } from './models/db';
import 'source-map-support/register';
import loginRouter from './routes/loginRoutes';
import productRouter from './routes/productRouter';
import funcaoRouter from './routes/funcaoRoutes';
import stockRouter from './routes/stockRouter';
import registerProduct from './routes/registerProductRouter'
import clientRouter from './routes/clientsRouter'
import vendaRouter from './routes/vendaRouter';

const app = express();
const cors = require('cors');

const port = process.env.API_PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/funcao', funcaoRouter);
app.use('/api/products', productRouter);
app.use('/api/stock', stockRouter);
app.use("/api/registerProduct", registerProduct);
app.use('/api/clients', clientRouter)
app.use("/api/venda", vendaRouter);

app.post('/api/products', async (req, res) => {
    const { name, price, quantiity, description, client_id } = req.body;

    if (!name || !price || !quantiity || !description || !client_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const db = await getDb();
        const { lastID: productId } = await db.run(
            'INSERT INTO products (name, price, quantity, description, client_id) VALUES (?, ?, ?, ?, ?)',
            [name, price, quantiity, description, client_id]
        );

        let invoice = await db.get(
            'SELECT * FROM invoices WHERE client_id = ? AND date = ?',
            [client_id, new Date().toISOString().split('T')[0]]
        );

        if (!invoice) {
            const { lastID: invoiceId } = await db.run(
                'INSERT INTO invoices (client_id, date) VALUES (?, ?)',
                [client_id, new Date().toISOString().split('T')[0]]
            );
            invoice = { id: invoiceId };
        }

        await db.run(
            'INSERT INTO invoice_items (invoice_id, product_id) VALUES (?, ?)',
            [invoice.id, productId]
        );
        res.status(201).json({ message: 'Produto Adicionado e Fatura atualizada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar produto e atualizar fatura' });
    }
});

app.get('/api/invoices', async (req, res) => {
    try {
        const db = await getDb();
        const invoices = await db.all('SELECT * FROM invoices');
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Erro ao listar faturas:', error);
        res.status(500).json({ message: 'Erro ao listar faturas.' });
    }
});

app.listen(port, async () => {
    console.log(`Servidor rodando na porta : ${port}`);
    await openDb();
});
