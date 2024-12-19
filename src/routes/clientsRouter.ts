import { getDb } from '../models/db';
import { Router } from 'express';

const router = Router()

router.post('/', async (req, res) => {
    const { nameClient, telefone } = req.body;

    if (!nameClient) {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    try {
        const db = await getDb();
        await db.run('INSERT INTO clients (nameClient, telefone) VALUES (?,?)', [nameClient, telefone]);
        res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar cliente', error);
        res.status(500).json({ message: 'Erro ao cadastrar cliente' });
    }
});

router.get('/', async (req, res) => {
    try {
        const db = await getDb();
        const clients = await db.all('SELECT * FROM clients');
        res.status(200).json(clients);
    } catch (error) {
        console.error('Erro ao listar clientes', error);
        res.status(500).send('Erro ao listar clientes');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await getDb();
        await db.run('DELETE FROM clients WHERE id = ?', [id]);
        res.status(200).json({ message: 'Cliente Eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Erro', error });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nameClient, telefone } = req.body;

    if (!nameClient || !telefone) {
        return res.status(400).json({ message: 'Nome e telefone são obrigatórios' });
    }

    try {
        const db = await getDb();
        const result = await db.run(
            'UPDATE clients SET nameClient = ?, telefone = ? WHERE id = ?',
            [nameClient, telefone, id]
        );

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


export default router;