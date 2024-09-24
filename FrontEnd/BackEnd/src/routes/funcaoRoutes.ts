import express from 'express'
import { getDb } from '../models/db'

const router = express.Router()

router.post("/", async (req,res) => {
    const {funcao} = req.body
    try{
         const bd = getDb()
         const user = await bd.run('SELECT * FROM users WHERE funcao = ?',[funcao])

         if(user === funcao){
            res.status(200).json({message:"Todos Gerentes na tabela"})
         }
         else{
            res.status(401).json({message:"Função desconhecida"})
         }
    }
    catch(error){
        res.status(500).json({message:"Erro ao pesquisar funcao"})
    }
})

router.get('/', async (req, res) => {
    const db = getDb()
    const users = await db.all('SELECT * FROM users')
    res.json(users)
  });
export default router
