console.log
require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];

function loadCommandFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      loadCommandFiles(fullPath);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".js")) continue;

    const command = require(fullPath);

    if (command?.data && command?.execute) {
      commands.push(command.data.toJSON());
    }
  }
}

loadCommandFiles(path.join(__dirname, "src", "commands"));

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    if (!process.env.CLIENT_ID) {
      throw new Error("CLIENT_ID eksik.");
    }

    console.log(`Toplam ${commands.length} komut yükleniyor...`);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("Komutlar başarıyla yüklendi.");
  } catch (error) {
    console.error("Komut yüklenemedi:", error);
  }
})();
