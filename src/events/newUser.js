export default {
  name: 'guildMemberAdd',
  async execute(client, member) {
    member.roles.add("1360260291316945006")
      .then((user) => {
        console.log(`Rol asignado a ${user}`);
      })
      .catch(console.error);
  }
}
