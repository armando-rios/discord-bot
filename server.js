import express from "express"
import connectDB from "./db.js"
import runBot from './src/discord/main.js'
import setCommands from "./src/discord/setCommands.js"
const app = express()
const PORT = 3000

connectDB()
setCommands()
runBot()

app.use(express.json())

app.listen(PORT, () => {
  console.log(`server listen on port: ${PORT}`)
})
