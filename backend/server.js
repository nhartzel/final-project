const express = require('express');
const mysql = require('mysql2');

require('dotenv').config();

const port = process.env.port || 3000;
const app = express();
app.use(express.json());

var connection = mysql.createConnection({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    ssl: { "rejectUnauthorized": false }
});

