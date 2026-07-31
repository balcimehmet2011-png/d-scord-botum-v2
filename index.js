require("dotenv").config();

const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
  ],
});

client.commands = new Collection();
client.buttons = new Collection();

function loadModules(baseDir, collection) {
  if (!fs.existsSync(baseDir)) return;

  const folders = fs.readdirSync(baseDir);

  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const item = require(filePath);

      if (item && item.data && item.execute) {
        collection.set(item.data.name, item);
      }
    }
  }
}

function loadEvents(baseDir) {
  if (!fs.existsSync(baseDir)) return;

  const folders = fs.readdirSync(baseDir);

  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const event = require(filePath);

      if (!event || !event.name || !event.execute) continue;

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }
}

loadModules(path.join(__dirname, "src", "commands"), client.commands);
loadModules(path.join(__dirname, "src", "buttons"), client.buttons);
loadEvents(path.join(__dirname, "src", "events"));

client.once(Events.ClientReady, () => {
  console.log(`${client.user.tag} aktif oldu.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      await command.execute(interaction, client);
      return;
    }

    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return;
      await button.execute(interaction, client);
    }
  } catch (err) {
    console.error(err);

    const payload = {
      content: "Komut çalıştırılırken hata oluştu.",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(payload).catch(() => {});
    } else {
      await interaction.reply(payload).catch(() => {});
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
