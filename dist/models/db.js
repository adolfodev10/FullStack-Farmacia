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
exports.getDb = exports.openDb = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
let db;
const openDb = () => __awaiter(void 0, void 0, void 0, function* () {
    db = yield (0, sqlite_1.open)({
        filename: './database.db',
        driver: sqlite3_1.default.Database
    });
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            funcao TEXT CHECK(funcao IN('Farmacêutico(a)', 'Gerente', 'Balconista', 'Limpeza')),
            senha TEXT NOT NULL
        )
    `);
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS registerProduct (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nameProduct TEXT NOT NULL UNIQUE,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        quantity INTEGER NOT NULL 
        )
        `);
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nameClient TEXT NOT NULL UNIQUE,
            telefone INTEGER NOT NULL
        )
    `);
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            quantidade INTEGER NOT NULL,
            client_id INTEGER,
            FOREIGN KEY (client_id) REFERENCES clients (id)
        )
    `);
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS invoices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER,
            date TEXT NOT NULL,
            FOREIGN KEY (client_id) REFERENCES clients (id)
        )
    `);
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS invoice_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            invoice_id INTEGER,
            product_id INTEGER,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (invoice_id) REFERENCES invoices (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        )
    `);
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS venda (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nameClient TEXT NOT NULL,
        name TEXT NOT NULL UNIQUE,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        quantidade INTEGER NOT NULL,
        date TEXT NOT NULL
        )
        `);
});
exports.openDb = openDb;
const getDb = () => db;
exports.getDb = getDb;
