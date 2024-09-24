import { getDb } from '../models/db'; // Ajuste o caminho conforme necessário

export const addClient = async (nameClient: string, telefone:number) => {
  const db = getDb();
  await db.run(`
    INSERT INTO clients (nameClient, telefone) 
    VALUES (?,?)
  `, [nameClient, telefone]);
};

export const getClients = async () => {
  const db = getDb();
  return await db.all(`
    SELECT * FROM clients
  `);
};

export const getClientById = async (id: number) => {
  const db = getDb();
  return await db.get(`
    SELECT * FROM clients WHERE id = ?
  `, [id]);
};

export const updateClient = async (id: number, nameClient: string, telefone:number) => {
  const db = getDb();
  await db.run(`
    UPDATE clients
    SET nameCient = ? AND telefone = ?
    WHERE id = ?
  `, [nameClient, telefone, id]);
};

export const deleteClient = async (id: number) => {
  const db = getDb();
  await db.run(`
    DELETE FROM clients WHERE id = ?
  `, [id]);
};

