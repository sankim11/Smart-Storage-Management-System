import express from "express"
import mysql from "mysql2"
import cors from "cors";

const app = express();
app.use(cors());

const port = 4000
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"storagesystem",
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