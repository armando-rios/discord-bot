const express = require("express")
const connectDB = require("./db")
const app = express()
const PORT = 3000

connectDB()

app.use(express.json())

app.listen(PORT, () => {
  console.log(`server listen on port: ${PORT}`)
})
