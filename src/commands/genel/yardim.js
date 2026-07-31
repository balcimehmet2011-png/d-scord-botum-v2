const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yardim")
    .setDescription("Komutları gösterir."),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Yardım Menüsü")
      .setDescription("Kullanabileceğin komutlar:")
      .addFields(
        { name: "Genel", value: "`/ping`\n`/yardim`" },
        { name: "Moderasyon", value: "`/ban`\n`/kick`\n`/clear`\n`/timeout`\n`/warn`" },
        { name: "Diğer", value: "`/ticket`\n`/basvuru`" }
      )
      .setColor("Blue");

    await interaction.reply({ embeds: [embed] });
  },
};

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yardim")
    .setDescription("Komutları gösterir."),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Yardım Menüsü")
      .setDescription("Kullanabileceğin komutlar:")
      .addFields(
        { name: "Genel", value: "`/ping`\n`/yardim`" },
        { name: "Moderasyon", value: "`/ban`\n`/kick`\n`/clear`\n`/timeout`\n`/warn`" },
        { name: "Diğer", value: "`/ticket`\n`/basvuru`" }
      )
      .setColor("Blue");

    await interaction.reply({ embeds: [embed] });
  },
};
