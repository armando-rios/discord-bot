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

        const message = new EmbedBuilder()
          .setTitle("Jugadores")
          .setDescription(players.map(j => `- **${j.name}**: \t${j.lives} vidas`).join("\n"))
          .setColor('Purple')
          .addFields({ name: "Más información", value: "[Here ->](https:discord-bot-ar.onrender.com)", inline: false });

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
