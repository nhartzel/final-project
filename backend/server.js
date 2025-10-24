const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const port = process.env.port || 3000;
const app = express();
app.use(express.json());

var pool = mysql.createPool({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    ssl: { "rejectUnauthorized": false }
});

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;

    const sql = "SELECT password FROM user WHERE username = ?";
    const vals = [username]

    pool.query(sql, vals, (err, results) => {
        if (err) { throw err; }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "no user found"
            });
        }

        const db_pwd = results[0].password;

        bcrypt.compare(password, db_pwd, (err, isMatch) => {
            if (isMatch) {
                res.status(200).json({
                    success: true,
                    message: "found matching credentials",
                    username: username
                });
                
            } else {
                res.status(500).json({
                    success: false,
                    message: "something went wrong lol"
                });
            }
        })
    })

});

app.post('/api/signup', async (req, res) =>{

    const {username, password} = req.body

    if (!username || !password ) {
        return res.status(400).json({
            success: false,
            message: "missing username or password"
        });
    }

    const date = new Date();
    const pwd = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const sqlstr = 'INSERT INTO user (username, password, signedup) VALUES (?, ?, ?)';
    const values = [username, pwd, date];

    pool.query(sqlstr, values, function (error, results) {
        if (error) throw error;
        res.status(201).send({ message: 'User created successfully!', userId: results.insertId });;
    });
});

const server = app.listen(port, () => {
    console.log(`server on port ${port}`);
});

process.on('SIGINT', () => {
    console.log('\n🚨 Received SIGINT signal. Starting graceful shutdown...');
    server.close(() => {
        console.log('🌐 HTTP server closed.');

        pool.end((err) => {
            if (err) {
                console.error('❌ Error closing database pool:', err.stack);
                process.exit(1); 
            }
            console.log('💾 Database pool closed gracefully.');
            process.exit(0); 
        });
    });
});