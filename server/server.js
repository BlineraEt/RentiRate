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

app.post('/add_user', async (req, res) => {
    const { name, surname, email, age, gender } = req.body;

    try {
        const [existingGender] = await db.query("SELECT id FROM genders WHERE gender = ?", [gender]);

        let genderId;

        if (existingGender && existingGender.id) {
            genderId = existingGender.id;
        } else {
            const [insertedGenderResult] = await db.query("INSERT INTO genders (gender) VALUES (?)", [gender]);
            genderId = insertedGenderResult.insertId;
        }

        const [insertedUserResult] = await db.query("INSERT INTO sellers (name, surname, email, age, gender_id) VALUES (?, ?, ?, ?, ?)", [name, surname, email, age, genderId]);

        return res.json({ success: 'User added successfully!', id: insertedUserResult.insertId });
    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})


//app.post('/add_user', (req, res) => {
//    const { name, surname, email, age, gender } = req.body;
//
//    const sqlCheckGender = "SELECT id FROM genders WHERE gender = ?";
//    db.query(sqlCheckGender, [gender], (err, genderResult) => {
//        if(err) return res.json({message: 'Error checking gender existence: ' + err });
//
//        let genderId;
//
//        if (genderResult.length > 0) {
//            genderId = genderResult[0].id;
//            insetSeller(name, surname, email, age, genderId);
//        } else {
//            const sqlInsertGender = "INSERT INTO genders (gender) VALUES (?)";
//            db.query(sqlInsertGender, [gender], (err, insertResult) => {
//                if(err) return res.json({message: 'Error adding gender: ' + err});
//
//                genderId = insertResult.insertId;
//                insertSeller(name, surname, email, age, genderId);
//            })
//        }
//    })
//
//    function insertSeller(name, surname, email, age, genderId){
//        const sqlInsertSeller = "INSERT INTO sellers (name, surname, email, age, gender_id) VALUES (?, ?, ?, ?, ?)";
//        const insertValues = [name, surname, email, age, genderId];
//
//        db.query(sqlInsertSeller, insertValues, (err, result) => {
//            if(err) return res.json({ message: 'Error adding seller: ' + err});
//
//            return res.json({success: 'User added successfully!', id: result.insertId});
//        })
//    }
//})

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
    sql = "UPDATE sellers SET `name` = ?, `surname` = ? , `email` = ?, `age` = ?, `gender` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.age,
        req.body.gender,
        id
    ]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured' + err})
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


app.listen(port, ()=>{
    console.log('listening')
})