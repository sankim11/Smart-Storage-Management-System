import express from "express"
import mysql from "mysql"

const app = express()

const port = 4000
// const db = mysql.createConnection({
//     host:"localhost",
//     user:"",
//     password:"",
//     database:""
// })

app.get("/", (req, res) => {
    res.json([{"test":"hello this is the backend!"}])
})

app.get("/hello", (req, res) => {
    res.json("yo")
})

app.listen(port, () => {
    console.log("backend listening on port", port)
})