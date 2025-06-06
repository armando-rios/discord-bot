export default {
  name: 'ready',
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
}
