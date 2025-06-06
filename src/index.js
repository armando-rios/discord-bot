import { GatewayIntentBits } from "discord.js";
import ExtendedClient from "./estructures/ExtendedClient.js";

// Configuracion del cliente
const client = new ExtendedClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

// Cargar comandos y eventos

// Iniciar la aplicacion
client.login(process.env.TOKEN)
