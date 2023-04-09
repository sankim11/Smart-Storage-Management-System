import express from "express"
import mysql from "mysql2"
import cors from "cors";

const app = express();
app.use(cors());

const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const port = 4000
const db = mysql.createConnection({
    host:"localhost",
    user:MYSQL_USER,
    password:MYSQL_PASSWORD,
    database:"storagesystem"
})

app.get("/employees", (req, res) => {
    const q = "SELECT * FROM employee"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/customers", (req, res) => {
    const q = "SELECT * FROM customer"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post('/employees/create/:email/:firstName/:lastName/:password', (req, res) => {
    // const { Email, FirstName, LastName, PasswordE } = req.body;
    const Email = req.params.email;
    const FirstName = req.params.firstName;
    const LastName = req.params.lastName;
    const PasswordE = req.params.password;
    db.query('INSERT INTO employee (Email, FirstName, LastName, PasswordE) VALUES (?, ?, ?, ?)', [Email, FirstName, LastName, PasswordE], (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).send('Employee created successfully');
      }
    });
})

app.post('/customers/create/:email/:firstName/:lastName/:password', (req, res) => {
    // const { Email, FirstName, LastName, PasswordE } = req.body;
    const Email = req.params.email;
    const FirstName = req.params.firstName;
    const LastName = req.params.lastName;
    const PasswordC = req.params.password;
    db.query('INSERT INTO customer (ClientEmail, FirstName, LastName, ClientPassword) VALUES (?, ?, ?, ?)', [Email, FirstName, LastName, PasswordC], (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).send('Customer created successfully');
      }
    });
})

app.post('/customers/create/cart/:client_email', (req, res) => {
    const ClientEmail = req.params.client_email;
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10);
    const currentTime = now.toTimeString().slice(0, 8);
    db.query('SELECT MAX(CartID) AS max_id FROM cart', (err,data) => {
        if(err) return res.json(err)
        const newId = (data[0].max_id) + 1;
        const newRecord = {
            CartId: newId,
            ClientEmail: ClientEmail,
            DateSold: currentDate,
            TimeSold: currentTime
        };

        db.query('INSERT INTO cart SET ?', newRecord, (err1, res2) => {
            if (err1) {
                res.status(500).send(err);
            } else {
                // res1.status(201).send('Customer created successfully');
                res.status(201).json([{ "entry_id": newId }]);
            }
        });
            console.log(`New record inserted with CartId ${newId}`);
        });
})

app.get("/storage", (req, res) => {
    const q = "SELECT DISTINCT mainstorage.*, item.*, COALESCE(edible.expiry, 'N/A') as expiry FROM mainstorage JOIN Item ON mainstorage.ItemID = Item.ItemID LEFT JOIN edible ON mainstorage.ItemID = edible.ItemID"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/orders", (req, res) => {
    const q = "SELECT cart.*, customer.* FROM cart JOIN customer ON cart.ClientEmail = customer.ClientEmail ORDER BY cart.DateSold DESC"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/reports", (req, res) => {
    const q = "SELECT * FROM report"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/suppliers", (req, res) => {
    const q = "SELECT * FROM supplier"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/items", (req, res) => {
    const q = "SELECT DISTINCT mainstorage.*, item.ItemName, item.Price, item.Category FROM mainstorage  LEFT JOIN Item ON mainstorage.ItemID = Item.ItemID"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(port, () => {
    console.log("backend listening on port", port)
})