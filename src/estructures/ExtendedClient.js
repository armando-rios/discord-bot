import { Client, Collection } from 'discord.js';

class ExtendedClient extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.events = new Collection();
    this.config = {};
  }
}

export default ExtendedClient;
