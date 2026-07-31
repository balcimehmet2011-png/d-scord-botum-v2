const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: "application_create",
  },

  async execute(interaction) {
    const guild = interaction.guild;
    const member = interaction.member;

    const channelName = `basvuru-${member.user.id}`;

    const existingChannel = guild.channels.cache.find(
      (channel) =>
        channel.name === channelName && channel.type === ChannelType.GuildText
    );

    if (existingChannel) {
      return interaction.reply({
        content: `Zaten açık bir başvuru kanalın var: ${existingChannel}`,
        ephemeral: true,
      });
    }

    const channel = await guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: member.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
        {
          id: interaction.client.user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.ManageChannels,
          ],
        },
      ],
    });

    const embed = new EmbedBuilder()
      .setTitle("📋 Başvuru Kanalı")
      .setColor("Blue")
      .setDescription(
        [
          "Başvurunu aşağıdaki soruları cevaplayarak yap:",
          "",
          "1. İsmin nedir?",
          "2. Yaşın kaç?",
          "3. Discord deneyimin var mı?",
          "4. Neden seni seçmeliyiz?",
        ].join("\n")
      )
      .setTimestamp();

    await channel.send({
      content: `${member}`,
      embeds: [embed],
    });

    await interaction.reply({
      content: `Başvuru kanalın oluşturuldu: ${channel}`,
      ephemeral: true,
    });
  },
};
