import { GatewayIntentBits } from "discord.js";
import ExtendedClient from "./estructures/ExtendedClient.js";
import path from "path";
import { fileURLToPath } from "url";

// Configuracion del cliente
const client = new ExtendedClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar comandos y eventos
client.loadEvents(path.join(__dirname, "events"));

// Iniciar la aplicacion
client.login(process.env.TOKEN)
