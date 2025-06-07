import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// configuracion del cliente REST
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// ruta de los comandos
const commandsPath = path.join(__dirname, 'commands');

function loadCommands(commandsPath) {
  const commands = [];
  const categories = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  const loadPromises = categories.map(async (category) => {
    const categoryPath = path.join(commandsPath, category);
    try {
      const command = await import(categoryPath);
      if (command.default.data && command.default.execute) {
        commands.push(command.default.data.toJSON());
      } else {
        console.error(`El comando en ${categoryPath} no tiene data o execute.`);
      }
    } catch (error) {
      console.error(`Error al cargar el comando en ${categoryPath}:`, error);
    }
  });

  return Promise.all(loadPromises).then(() => commands);
}

(async () => {
  try {
    console.log("Cargando comandos desde la carpeta...");

    const commands = await loadCommands(commandsPath);

    console.log("Iniciando la actualización de comandos...");
    console.log(commands);

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    // Si quieres registrar comandos solo en un servidor específico:
    // await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

    console.log("¡Comandos registrados exitosamente!");
  } catch (error) {
    console.error("Error al registrar los comandos:", error);
  }
})();
