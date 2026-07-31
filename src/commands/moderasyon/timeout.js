const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Kullanıcıyı susturur (yakında eklenecek)."),
  async execute(interaction) {
    await interaction.reply("⏳ Timeout komutu yakında eklenecek.");
  },
};
