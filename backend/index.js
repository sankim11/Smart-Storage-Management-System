import express from "express"
import mysql from "mysql2"
import cors from "cors";

const app = express();
app.use(cors());

const MYSQL_USER = process.env.MYSQL_USER;
// console.log(MYSQL_USER);
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
// console.log(MYSQL_PASSWORD);

const port = 4000
const db = mysql.createConnection({
    host:"localhost",
    user:MYSQL_USER,
    password:MYSQL_PASSWORD,
    database:"storagesystem",
})

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "storagesystem",
  });

// app.post('/login', async (req, res) => {
//     const { Email, PasswordE, emp } = req.body;
//     const [rows] = await pool.query('SELECT * FROM employee WHERE Email = ? AND PasswordE = ?', [Email, PasswordE]);
//     if (rows.length === 1) {
//         req.session.userId = rows[0].id;
//         res.json({ userType: emp ? 'employee' : 'customer' });
//       } else {
//         res.status(401).json({ error: 'Invalid email or password' });
//       }
// });

//add new users for emp and cust
//update items when order placed
//update storage, make new cart


app.get("/employees", (req, res) => {
    const q = "SELECT * FROM employee"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/customers", (req, res) => {
    const query = "SELECT * FROM customer"
    db.query(query, (err,data) => {
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
});

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
});

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
    const q = "SELECT DISTINCT mainstorage.*, item.* FROM mainstorage JOIN Item ON mainstorage.ItemID = Item.ItemID"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(port, () => {
    console.log("backend listening on port", port)
})