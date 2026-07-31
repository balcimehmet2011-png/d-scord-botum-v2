const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Kullanıcıyı uyarır."),
  async execute(interaction) {
    await interaction.reply("⚠️ Warn komutu yakında eklenecek.");
  },
};
