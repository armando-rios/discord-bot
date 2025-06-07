import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Elimina los mensajes del canal actual.")
    .addIntegerOption(option =>
      option.setName("cantidad")
        .setDescription("Número de mensajes a eliminar")
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(100)),

  async execute(interaction) {
    const cantidad = interaction.options.getInteger("cantidad") | 100

    const fetched = await interaction.channel.messages.fetch({ limit: cantidad });
    await interaction.channel.bulkDelete(fetched)
      .then(messages => interaction.reply(`Se han eliminado ${messages.size} mensajes.`))
      .catch(error => {
        console.error(error);
        interaction.reply({ content: "Hubo un error al intentar eliminar los mensajes.", ephemeral: true });
      });
  }
}
