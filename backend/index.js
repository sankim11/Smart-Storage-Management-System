import express from "express"
import mysql from "mysql"

const app = express()

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"",
//     password:"",
//     database:""
// })

app.get("/", (req, res) => {
    res.json("hello this is the backend!")
})

app.get("/hello", (req, res) => {
    res.json("yo")
})

app.listen(4000, () => {
    console.log("backend initiated!")
})