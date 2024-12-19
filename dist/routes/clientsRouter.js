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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClients = exports.addClient = void 0;
const db_1 = require("../models/db"); // Ajuste o caminho conforme necessário
const addClient = (nameClient, telefone) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    yield db.run(`
    INSERT INTO clients (nameClient, telefone) 
    VALUES (?,?)
  `, [nameClient, telefone]);
});
exports.addClient = addClient;
const getClients = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    return yield db.all(`
    SELECT * FROM clients
  `);
});
exports.getClients = getClients;
const getClientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    return yield db.get(`
    SELECT * FROM clients WHERE id = ?
  `, [id]);
});
exports.getClientById = getClientById;
const updateClient = (id, nameClient, telefone) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    yield db.run(`
    UPDATE clients
    SET nameCient = ? AND telefone = ?
    WHERE id = ?
  `, [nameClient, telefone, id]);
});
exports.updateClient = updateClient;
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    yield db.run(`
    DELETE FROM clients WHERE id = ?
  `, [id]);
});
exports.deleteClient = deleteClient;
