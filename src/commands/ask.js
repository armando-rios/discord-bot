import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription("repositorio de preguntas frecuentes"),

  async execute(interaction) {
    await interaction.reply("Esta pregunta aun no tiene respuesta, por favor contacta al administrador del servidor para mas informacion.");
  },
}
