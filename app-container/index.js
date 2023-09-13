const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const mysql = require("mysql");

const PORT = 3010;
const config = {
    host: "db_desafio",
    user: "root",
    password: "root",
    database: "desafio_db"
};

(function CreatePeopleTableIfNotExists() {
    const query = "CREATE TABLE IF NOT EXISTS peoples (name VARCHAR(255))";
    const conn = mysql.createConnection(config);
    conn.query(query);
    conn.end();
})();

app.use(bodyParser.text({ type: 'text/plain' }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/people", (req, res) => {
    const conn = mysql.createConnection(config);
    const sql = `INSERT INTO peoples(name) values('${req.body}')`;
    conn.query(sql, (err, result) => {
        const sql = `SELECT * FROM peoples`;
        conn.query(sql, (err, result) => {
            res.send(result);
            conn.end();
        });
    });
});

app.get('/people', (req, res) => {
    const conn = mysql.createConnection(config);
    const sql = `SELECT * FROM peoples`;
    conn.query(sql, (err, result) => {
        res.send(result);
        conn.end();
    });
});

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
});