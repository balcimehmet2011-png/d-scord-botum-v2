const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: {
    name: "ticket_create",
  },

  async execute(interaction) {
    const guild = interaction.guild;
    const member = interaction.member;

    const channelName = `ticket-${member.user.id}`;

    const existingChannel = guild.channels.cache.find(
      (channel) =>
        channel.name === channelName && channel.type === ChannelType.GuildText
    );

    if (existingChannel) {
      return interaction.reply({
        content: `Zaten açık bir ticket kanalın var: ${existingChannel}`,
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
      .setTitle("🎫 Ticket Kanalı")
      .setDescription("Destek ekibi birazdan seninle ilgilenecek.")
      .setColor("Green")
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("ticket_close")
        .setLabel("Ticket Kapat")
        .setStyle(ButtonStyle.Danger)
    );

    await channel.send({
      content: `${member}`,
      embeds: [embed],
      components: [row],
    });

    await interaction.reply({
      content: `Ticket kanalın oluşturuldu: ${channel}`,
      ephemeral: true,
    });
  },
};
