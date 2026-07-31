const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Bir kullanıcıyı sunucudan atar.")
    .addUserOption(option =>
      option
        .setName("uye")
        .setDescription("Atılacak kullanıcı")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const uye = interaction.options.getUser("uye");
    const member = await interaction.guild.members.fetch(uye.id).catch(() => null);

    if (!member) {
      return interaction.reply({
        content: "Kullanıcı bulunamadı.",
        ephemeral: true,
      });
    }

    await member.kick();
    await interaction.reply(`✅ ${uye.tag} sunucudan atıldı.`);
  },
};
