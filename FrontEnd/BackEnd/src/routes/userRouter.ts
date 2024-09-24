import { Router } from 'express';
import { getDb } from '../models/db'; // Função para obter conexão com o banco de dados

const stockRouter = Router();

// Listar todos os produtos em estoque
stockRouter.get('/', async (req, res) => {
    try {
        const db = getDb();
        const users = await db.all('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
});

// Adicionar um novo produto ao estoque
stockRouter.post('/', async (req, res) => {
    const { name, funcao, senha } = req.body;
    if (!name || !funcao || !senha) {
        return res.status(400).json({ message: 'Nome, função e senha são obrigatórios' });
    }
    try {
        const db = getDb();
        await db.run('INSERT INTO users (name,funcao,senha) VALUES ( ?, ?, ?)', [name, funcao, senha]);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
});

// Atualizar um produto existente no estoque
stockRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, funcao, senha } = req.body; // Atualiza também o preço
    if (name === undefined || funcao === undefined || senha === undefined) {
        return res.status(400).json({ message: 'Nome, função e senha são obrigatórios' });
    }
    try {
        const db = getDb();
        const result = await db.run('UPDATE users SET name = ?, funcao = ?, senha = ? WHERE id = ?', [name,funcao,senha, id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
});

// Remover um produto do estoque
stockRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = getDb();
        const result = await db.run('DELETE FROM users WHERE id = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário removido com sucesso!' });
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        res.status(500).json({ message: 'Erro ao remover usuário.' });
    }
});

export default stockRouter;
