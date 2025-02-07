import { REST, Routes } from "discord.js"

const commands = [
  {
    name: "vidas",
    description: "Muestra la lista de jugadores y sus vidas.",
  },
];

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
