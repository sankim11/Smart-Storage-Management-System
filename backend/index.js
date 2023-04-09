import express from "express"
import mysql from "mysql2"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const port = 4000
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
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
    const Email = req.params.email;
    const FirstName = req.params.firstName;
    const LastName = req.params.lastName;
    const PasswordE = req.params.password;
  
    db.query('SELECT * FROM employee WHERE Email = ?', [Email], (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else if (results.length > 0) {
        res.status(409).send('Email already exists');
      } else {
        db.query('INSERT INTO employee (Email, FirstName, LastName, PasswordE) VALUES (?, ?, ?, ?)', [Email, FirstName, LastName, PasswordE], (error, results, fields) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.status(201).send('Employee created successfully');
          }
        });
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
})

app.get("/storage", (req, res) => {
    const q = `
      SELECT DISTINCT mainstorage.*, item.*, COALESCE(edible.expiry, 'N/A') as expiry 
      FROM mainstorage 
      JOIN Item ON mainstorage.ItemID = Item.ItemID 
      LEFT JOIN edible ON mainstorage.ItemID = edible.ItemID`
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/api/orders", (req, res) => {
  const email = req.query.email;
  let q;

  if (email) {
    q = `
      SELECT cart.*, revenue.TotalRevenue 
      FROM cart JOIN customer ON cart.ClientEmail = customer.ClientEmail 
      JOIN (SELECT CartID, SUM(QuantitySold * Price) AS TotalRevenue 
      FROM itemslist JOIN item ON itemslist.ItemID = item.ItemID GROUP BY CartID) revenue ON cart.CartID = revenue.CartID 
      WHERE cart.ClientEmail = ? 
      ORDER BY cart.DateSold DESC`;
  } else {
    q = "SELECT cart.*, customer.* FROM cart JOIN customer ON cart.ClientEmail = customer.ClientEmail ORDER BY cart.DateSold DESC";
  }

  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/reports", (req, res) => {
    const q = `
      SELECT report.*, SUM(item.Price * itemslist.QuantitySold) AS TotalRevenue
      FROM report
      INNER JOIN cart ON report.CartID = cart.CartID
      INNER JOIN itemslist ON cart.CartID = itemslist.CartID
      INNER JOIN item ON itemslist.ItemID = item.ItemID
      GROUP BY report.ReportID    
    `
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/suppliers", (req, res) => {
    const q = `
      SELECT DISTINCT supplier.*, item.* 
      FROM supplier INNER JOIN supplieritems ON supplier.SupplierID = supplieritems.SupplierID 
      INNER JOIN item ON supplieritems.ItemID = item.ItemID`
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/items", (req, res) => {
    const q = `
      SELECT DISTINCT mainstorage.*, item.ItemName, item.Price, item.Category 
      FROM mainstorage 
      LEFT JOIN Item ON mainstorage.ItemID = Item.ItemID`
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(port, () => {
    console.log("backend listening on port", port)
})