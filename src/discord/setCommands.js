import { REST, Routes, SlashCommandBuilder } from "discord.js"

const commands = [
  new SlashCommandBuilder()
    .setName('vidas')
    .setDescription('Muestra o modifica las vidas de los jugadores')
    .addStringOption(option =>
      option.setName("nombre")
        .setDescription("Nombre del jugador")
        .setRequired(false)
    )
    .addNumberOption(option =>
      option.setName("vida")
        .setDescription("Vidas perdidas o ganadas")
        .setRequired(false)
    )
].map(command => command.toJSON())

async function setCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

export default setCommands
