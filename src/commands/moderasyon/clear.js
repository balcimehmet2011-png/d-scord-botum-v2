const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Belirli sayıda mesaj siler.")
    .addIntegerOption(option =>
      option
        .setName("sayi")
        .setDescription("Silinecek mesaj sayısı")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const sayi = interaction.options.getInteger("sayi");

    const deleted = await interaction.channel.bulkDelete(sayi, true);

    await interaction.reply({
      content: `✅ ${deleted.size} mesaj silindi.`,
      ephemeral: true,
    });
  },
};
