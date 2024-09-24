import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter';
import { getDb, openDb } from './models/db';
import 'source-map-support/register';
import loginRouter from './routes/loginRoutes';
import productRouter from './routes/productRouter';
import funcaoRouter from './routes/funcaoRoutes';
import stockRouter from './routes/stockRouter';  // Importa o novo router

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/funcao', funcaoRouter);
app.use('/api/products', productRouter);
app.use('/api/stock', stockRouter);  // Adiciona o router de estoque

app.post('/api/clients', async (req, res) => {
    const { nameClient, telefone } = req.body;

    if (!nameClient) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    // if(!telefone){
    //     return res.status(400).json({ message:'Cliente sem telefone'})
    // }
    try {
        const db = getDb();
        await db.run('INSERT INTO clients (nameClient, telefone) VALUES (?,?)', [nameClient, telefone]);
        res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
    } catch (error) {
        console.error('Error ao cadastrar cliente', error);
        res.status(500).json({ message: 'Erro ao cadastrar cliente' });
    }
});

app.get('/api/clients', async (req, res) => {
    try {
        const db = getDb();
        const clients = await db.all('SELECT * FROM clients');
        res.status(200).json(clients);
    } catch (error) {
        console.error('Erro ao listar clientes', error);
        res.status(500).send('Erro ao listar clientes');
    }
});

app.delete('/api/clients/:id', async (req, res) => {
    const { id } = req.params;
    const db = getDb();

    try {
        await db.run('DELETE FROM clients WHERE id = ?', [id]);
        if (id) {
            res.status(200).json({ message: 'Cliente Eliminado' });
        } else {
            res.status(501).json({ message: 'Cliente Inexistente' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro', error });
    }
});

app.put('/api/clients/:id', async (req, res) => {
    const { id } = req.params;
    const { nameClient, telefone } = req.body;

    if (!nameClient || !telefone) {
        return res.status(400).json({ message: 'Nome e telefone são obrigatórios' });
    }

    try {
        const db = getDb();
        const result = await db.run(
            'UPDATE clients SET nameClient = ?, telefone = ? WHERE id = ?',
            [nameClient, telefone, id]
        );

        // Verifica se result e result.changes estão definidos
        if (result && result.changes && result.changes > 0) {
            res.status(200).json({ message: 'Cliente atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Cliente não encontrado ou nenhuma alteração foi feita' });
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente', error);
        res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
});

app.get('/api/registerProduct', async (req, res) => {
    try {
        const db = getDb()
        const registerProduct = await db.all("SELECT * FROM registerProduct")
        res.status(200).json(registerProduct)
    } catch (error) {
        console.error("Erro ao listar produto", error)
        res.status(500).send('Erro ao listar produto')
    }
})

app.post('/api/registerProduct', async (req, res) => {
    const { nameProduct, price, description } = req.body;

    if (!nameProduct || !price || !description) {
        return res.status(400).json({ message: "Preencha Tudo!" })
    }
    try {
        const db = getDb()
        await db.run(`INSERT INTO registerProduct (nameProduct, price, description) VALUES (?,?,?)`, [nameProduct, price, description])
        res.status(200).json({ message: "Produto adicionado com sucesso!" })
    }
    catch (error) {
        console.error('Erro ao cadastrar produto', error)
        res.status(500).json('Erro ao cadastrar produto')
    }
})

app.delete('/api/registerProduct/:id', async (req, res) => {
    const { id } = req.params
    const db = getDb()

    try {
        await db.run('DELETE FROM registerProduct WHERE id = ?', [id])
        if (id) {
            res.status(200).json({ message: 'Produto Eliminado' })
        }
        else {
            res.status(501).json({ message: 'Produto inexistente' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro', error })
    }
})


app.get('/api/venda', async (req, res) => {
    try {
        const db = getDb()
        const venda = await db.all('SELECT * FROM venda')
        res.status(200).json(venda)
    } catch (error) {
        console.error("Erro ao listar produto vendido", error)
        res.status(500).send('Erro ao listar Produto Vendido')
    }
})

app.delete('/api/venda/:id', async (req, res) => {
    const { id } = req.params
    const db = getDb()

    try {
        await db.run('DELETE FROM venda WHERE id = ?', [id])
        if (id) {
            res.status(200).json({ message: 'Venda ou produto Eliminado' })
        }
        else {
            res.status(501).json({ message: 'Venda inexistente' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro', error })
    }
})

app.post('/api/venda', async (req, res) => {
    const { nameProduct, price, description } = req.body;

    if (!nameProduct || !price || !description) {
        return res.status(400).json({ message: "Preencha Tudo!" })
    }

    const date = new Date().toLocaleString('pt-PT',{timeZone:'Africa/Luanda'})
    try {
        const db = getDb()
        await db.run('INSERT INTO venda (nameProduct, price, description, date) VALUES(?,?,?,?)', [nameProduct, price, description, date])
     
      res.status(200).json({ message:"Produto vendido com sucesso!"})
    } catch (error) {
        console.error('Error ao vender', error);
        res.status(500).json({ message: 'Erro ao vender' });
    }
})


app.post('/api/products', async (req, res) => {
    const { name, price, description, client_id } = req.body;
    if (!name || !price || !description || !client_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const db = getDb();
        const { lastID: productId } = await db.run('INSERT INTO products (name, price, description, client_id) VALUES (?, ?, ?, ?)', [name, price, description, client_id]);

        let invoice = await db.get('SELECT * FROM invoices WHERE client_id = ? AND date = ?', [client_id, new Date().toISOString().split('T')[0]]);
        if (!invoice) {
            const { lastID: invoiceId } = await db.run('INSERT INTO invoices (client_id, date) VALUES (?, ?)', [client_id, new Date().toISOString().split('T')[0]]);
            invoice = { id: invoiceId };
        }
        await db.run('INSERT INTO invoice_items (invoice_id, product_id) VALUES (?, ?)', [invoice.id, productId]);
        res.status(201).json({ message: 'Produto Adicionado e Fatura atualizada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar produto e atualizar fatura' });
    }
});

app.get('/api/invoices', async (req, res) => {
    try {
        const db = getDb();
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
