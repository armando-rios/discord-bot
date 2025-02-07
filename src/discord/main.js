import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js'
import Player from '../models/player.js'


const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})


function runBot() {

  client.once('ready', () => {
    console.log(`Bot connected as ${client.user.tag}`)
  })

  client.login(process.env.DISCORD_TOKEN)

  client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return
    const players = await Player.find()
    if (interaction.commandName === "vidas") {
      if (!interaction.options.getString("nombre")) {

        const pokeImg = async () => {
          const randomID = Math.floor(Math.random() * 1025) + 1
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`)
          const data = await response.json()
          return data.sprites.other['official-artwork'].front_deafult
        }

        const message = new EmbedBuilder()
          .setTitle("Jugadores")
          .setDescription(players.map(j => `- **${j.name}**: \t${j.lives} vidas`).join("\n"))
          .setImage(pokeImg())
          .setColor('Purple')
          .addFields({ name: "Más información", value: "[Here ->](https://pokelocke.onrender.com)", inline: true });

        await interaction.reply({ embeds: [message] })
      } else {
        const nombre = interaction.options.getString("nombre")
        const player = await Player.findOne({ name: nombre })
        const number = interaction.options.getNumber("vida")
        if (number < 0) {
          player.lives += number
          player.save()
        }
        if (number > 0) {
          player.lives += number
          player.save()
        }
        await interaction.reply(`${nombre} tiene: ${player.lives}`)
      }
    }
  })
}

export default runBot
