import express from 'express'
import { getDb } from '../models/db'

const router = express.Router()

router.post("/", async (req, res) => {
    const { name, senha } = req.body

    if (!name || !senha) {
        return res.status(400).json({ message: 'Nome e senha são obrigatórios' })
    }
    try {
        const db = await getDb()
        const user = await db.get('SELECT * FROM users WHERE name = ?', [name])

        if (user && user.senha === senha) {
            res.status(200).json({ message: "Login bem-sucedido" })
        }
        else {
            res.status(401).json({ message: 'Nome ou senha incorretos' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login' })
    }
})

router.get('/', async (req, res) => {
    const { name } = req.body
    const db = await getDb()
    const users = await db.all('SELECT * FROM users WHERE name = ?', [name])
    res.json(users)
});
export default router