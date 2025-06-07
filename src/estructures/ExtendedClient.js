import { Client, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

class ExtendedClient extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.events = new Collection();
    this.config = {};
  }

  // Método para cargar eventos
  loadEvents(eventsPath) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
      const eventPath = path.join(eventsPath, file);

      import(eventPath).then(event => {
        if (event.default && event.default.name && typeof event.default.execute === 'function') {
          this.events.set(event.default.name, event.default.execute);
          this.on(event.default.name, (...args) => event.default.execute(this, ...args));
        } else {
          console.warn(`El archivo ${file} no tiene un evento válido.`);
        }
      }).catch(err => {
        console.error(`Error al cargar el evento ${file}:`, err);
      });
    }
  }

  // Método para cargar comandos
  loadCommands(commandsPath) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const commandPath = path.join(commandsPath, file);
      import(commandPath).then(command => {
        if (command.default.data && command.default.execute) this.commands.set(command.default.data.name, command.default)
      }).catch(err => {
        console.error(`Error al cargar el comando ${file}:`, err);
      });
    }

    this.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error al ejecutar el comando ${interaction.commandName}:`, error);
        await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
      }
    })
  }

}

export default ExtendedClient;
