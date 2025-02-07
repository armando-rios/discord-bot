import express from "express"
const router = express.Router()
import { getPlayers } from "../controllers/playerController.js"

router.get('/', getPlayers)

export default router 
