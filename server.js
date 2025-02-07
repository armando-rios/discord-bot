import express from "express"
import connectDB from "./db.js"
import runBot from './src/discord/main.js'
import setCommands from "./src/discord/setCommands.js"
import playerRoutes from "./src/routes/playerRoutes.js"
const app = express()
const PORT = 3000

connectDB()
setCommands()
runBot()

app.use(express.json())
app.use(express.static('public'))
app.use('/api/players/', playerRoutes)

app.listen(PORT, () => {
  console.log(`server listen on port: ${PORT}`)
})
