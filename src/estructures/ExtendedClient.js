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
}

export default ExtendedClient;
