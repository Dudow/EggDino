module.exports = {
  commands: 'ticket',
  expectedArgs: '<ticket-message>',
  minArgs: 1,
  maxArgs: null,
  callback: (msg, arguments, text, client) => {
    const split = msg.content.substring(9)

    const serverId = '775054755860054036'
    const canalId = '778253923978444801'

    var canal = client.guilds.cache.get(serverId).channels.cache.get(canalId);

    canal.send(`${msg.author} sent:
      ${split}
    `)
  },
}