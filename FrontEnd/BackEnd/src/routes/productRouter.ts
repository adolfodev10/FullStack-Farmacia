import { Router } from "express";
import { getDb } from "../models/db";

const router = Router()

router.post("/", async (req, res) => {
    const {name, price, description, quantidade} = req.body
    const db = getDb()
    await db.run('INSERT INTO products (name,price, description, quantidade) VALUES (?,?,?,?)', [name, price, description, quantidade])
    res.status(201).json({message:"Produto adicionado com sucesso"})
})

router.get('/', async(req,res) => {
    const db = getDb()
    const products = await db.all('SELECT * FROM products')
    res.json(products)
})
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const db = getDb()

    try {
        await db.run('DELETE FROM products WHERE id = ?', [id])
        if(id){
            res.status(200).json({message:'Produto Eliminado'})
        }
        else{
            res.status(501).json({message:'Produto Inexistente'})
        }
    } catch (error) {
        res.status(500).json({message:'Erro',error})
    }
})
export default router