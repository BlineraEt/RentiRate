const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const { error } = require('console')

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5002;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "HappyLama1",
    database: "rentirate"
})

app.post('/add_user', async (req, res) => {
    const { name, surname, email, age, gender_id, gender } = req.body;

    try {
        const insertedUserResult = await db.query("INSERT INTO sellers (name, surname, email, age, gender_id, gender) VALUES (?, ?, ?, ?, ?, ?)", [name, surname, email, age, gender_id, gender]);

        return res.json({ success: 'User added successfully!', id: insertedUserResult.insertId });
    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.get("/rentirate", (req, res) => {
    const sql = "SELECT * FROM sellers";
    db.query(sql, (err, result) => {
        if(err) res.json({ message: "Server error" });
        return res.json(result);
    })
})

app.get("/get_seller/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM sellers WHERE `id` = ?";
    db.query(sql, [id], (err, result) => {
        if(err) res.json({ message: "Server error" });
        return res.json(result);
    })
})

app.post('/edit_user/:id', (req, res)=>{
    const id = req.params.id;
    const { name, surname, email, age, gender_id, gender } = req.body;
    const sql = "UPDATE sellers SET `name` = ?, `surname` = ?, `email` = ?, `age` = ?, `gender_id` = ?, `gender` = ? WHERE id = ?";
    const values = [name, surname, email, age, gender_id, gender, id];

    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occurred: ' + err})
        return res.json({success: "Seller updated successfully"})
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM sellers WHERE id = ?";
    const sqlSelect = "SELECT * FROM sellers";
    const sqlUpdateIds = "UPDATE sellers SET id = ? WHERE id = ?";
    
    db.query(sqlDelete, [id], (err, result) => {
        if (err) return res.json({ message: 'Error deleting user: ' + err });

        db.query(sqlSelect, (err, rows) => {
            if (err) return res.json({ message: 'Error fetching records: ' + err });

            let newId = 1;
            rows.forEach(row => {
                db.query(sqlUpdateIds, [newId++, row.id], (err, result) => {
                    if (err) console.log('Error updating ID: ' + err);
                });
            });

            return res.json({ success: 'User deleted successfully' });
        });
    });
});

app.get('/genders', (req, res) => {
    const sqlFetchGenders = "SELECT * FROM genders";

    db.query(sqlFetchGenders, (err, results) => {
        if (err) {
            console.error('Error fetching genders:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results);
    })
})

app.post('/add_gender', async (req, res) => {
    const { gender } = req.body;

    try {
        const result = await db.query("INSERT INTO genders (gender) VALUES (?)", [gender]);
        const insertedGenderId = result.insertId;
        return res.json({ success: 'Gender added successfully!', id: insertedGenderId });
    } catch (error) {
        console.error('Error adding gender:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.put('/edit_gender/:id', (req, res) => {
    const id = req.params.id;
    const { gender } = req.body;
    const sql = "UPDATE genders SET gender = ? WHERE id = ?";

    db.query(sql, [gender, id], (err, result) => {
        if (err) {
            console.error('Error updating gender:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ success: 'Gender updated successfully' });
    })
})

app.delete('/delete_gender/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM genders WHERE id = ?";

    db.query(sqlDelete, [id], (err, result) => {
        if (err) {
            console.error('Error deleting gender:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ success: 'Gender deleted successfully' });
    })
})

app.listen(port, ()=>{
    console.log('listening')
})