import mongoose from "mongoose";

const { Schema, model } = mongoose

const playerSchema = new Schema({
  name: String,
  lives: Number
})

const Player = model('Player', playerSchema)

export default Player
