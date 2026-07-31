const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun gecikmesini gösterir."),
  async execute(interaction) {
    const mesajGecikmesi = Date.now() - interaction.createdTimestamp;
    await interaction.reply(`🏓 Pong! ${mesajGecikmesi}ms`);
  },
};

t
