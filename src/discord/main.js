import { Client, GatewayIntentBits } from 'discord.js'


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
    if (interaction.commandName === "vidas") {
      await interaction.reply("Mensage desde el servidor")
    }
  })
}

export default runBot
