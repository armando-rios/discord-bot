import Player from "../models/player.js"

export async function getPlayers(req, res) {
  try {
    const players = await Player.find()
    res.json(players)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
