import sqlite3 from "sqlite3";
import path from "path";
const pathFile = path.resolve("./src/connection/","database.db");

const db = new sqlite3.Database(pathFile);

const pragma = `PRAGMA foreign_keys = ON`;

function enableForeignKey() {
    db.run(pragma, (error) => {
      if (error) console.log("Error in process of creation exec 'pragma'");
    });
}

const USERS_SCHEMA = `
CREATE TABLE usuarios (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(80),
    email VARCHAR(80),
    senha VARCHAR(100)
)`;

const CART_SCHEMA = `
CREATE TABLE carrinho (
    id VARCHAR(50) PRIMARY KEY, 
    userID VARCHAR(50) REFERENCES usuarios(id),
    productID VARCHAR(50) REFERENCES produtos(id),
    status VARCHAR(50)
)`;

const PRODUCTS_SCHEMA = `
CREATE TABLE produtos (
    id VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(80),
    descricao VARCHAR(150), 
    valor FLOAT
)`;

function CreateTableProduct() {
    db.run(PRODUCTS_SCHEMA, (error)=>{
        if(error) console.log(error);
    })
}

function CreateTableCart() {
    db.run(CART_SCHEMA, (erro) => {
        if(erro) console.log(erro);
    });
}

function CreateTableUser() {
    db.run(USERS_SCHEMA, (erro) => {
        if(erro) console.log(erro);
    });
}

db.serialize(() => {
     enableForeignKey();
     CreateTableProduct();
     CreateTableUser();
     CreateTableCart();
 });