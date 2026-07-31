const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bir kullanıcıyı banlar.")
    .addUserOption(option =>
      option
        .setName("uye")
        .setDescription("Banlanacak kullanıcı")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const uye = interaction.options.getUser("uye");
    const member = await interaction.guild.members.fetch(uye.id).catch(() => null);

    if (!member) {
      return interaction.reply({
        content: "Kullanıcı bulunamadı.",
        ephemeral: true,
      });
    }

    await member.ban();
    await interaction.reply(`✅ ${uye.tag} banlandı.`);
  },
};
