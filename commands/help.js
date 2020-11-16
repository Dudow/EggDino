module.exports = client => {

  const config = require("../config.json")
  const {prefix} = config
  const command = require('./commands')

  client.on('message', msg => {

    if (msg.content === '//help') {
      msg.channel.send(`
      Talk, Pagliacci, for a while you have this commands:
        **${prefix}hours <country name>** to see the current hour
        **${prefix}help** to come back to here
        **${prefix}addme** to invite me to your server
      `)
    } else if (msg.content === '//ajuda') {
      msg.channel.send(`Fala comédia, por enquanto você tem os comandos:
        **${prefix}horas <nome do país>** para conferir o horário atual
        **${prefix}ajuda** pra voltar pra cá
        **${prefix}addme** pra me colocar no seu server`)
    }
  })
}