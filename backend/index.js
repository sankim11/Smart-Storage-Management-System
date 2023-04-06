import express from "express"
import mysql from "mysql"

const app = express()

const port = 4000
const db = mysql.createConnection({
    host:"localhost",
    user:"saianeesh",
    password:"cpsc441",
    database:"StorageSystem"
})

app.get("/", (req, res) => {
    res.json([{"test":"hello this is the backend!"}])
})

app.get("/employees", (req, res) => {
    const q = "SELECT * FROM employee"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(port, () => {
    console.log("backend listening on port", port)
})