module.exports = {
  data: {
    name: "ticket_close",
  },

  async execute(interaction) {
    const channel = interaction.channel;

    if (!channel.name.startsWith("ticket-")) {
      return interaction.reply({
        content: "Bu buton sadece ticket kanallarında kullanılabilir.",
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: "Ticket kapatılıyor...",
      ephemeral: true,
    });

    setTimeout(async () => {
      await channel.delete("Ticket kapatıldı").catch(() => {});
    }, 3000);
  },
};
