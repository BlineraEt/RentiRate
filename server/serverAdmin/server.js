const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "160721Gj5140#",
    database: "rentirate"
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.post('/add_user', (req, res) => {
    const sql = "INSERT INTO admins (`id`, `name`, `surname`, `email`,`phone`, `address`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.phone,
        req.body.adress
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Failed to add admin' });
        }
        return res.status(200).json({ message: 'Admin added successfully' });
    });
});

app.get("/rentirate", (req, res) => {
    const sql = "SELECT * FROM admins";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        return res.status(200).json(result);
    });
});

app.get("/get_admin/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM admins WHERE `id` = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        return res.status(200).json(result);
    });
});

app.post('/edit_admin/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE admins SET `id` = ?, `name` = ?, `surname` = ?, `email` = ?,`phone` = ?, `address` = ? WHERE id = ?";
    const values = [
        req.body.id,
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.phone,
        req.body.address,
        id
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Failed to update admin' });
        }
        return res.status(200).json({ message: 'Admin updated successfully' });
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    sql = "DELETE FROM admins WHERE id = ?";
    const values = [id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Failed to delete admin' });
        }
        return res.status(200).json({ message: 'Admin deleted successfully' });
    });
});

app.listen(port, () => {
    console.log('Server is listening on port', port);
});
