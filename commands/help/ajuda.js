const { prefix } = require('../../config.json')

module.exports = {
  commands: 'ajuda',
  expectedArgs: null,
  minArgs: 0,
  maxArgs: 0,
  callback: (msg, arguments, text) => {
    msg.channel.send(`Fala comédia, por enquanto você tem os comandos:
        **${prefix}horas <nome do país>** para conferir o horário atual
        **${prefix}ajuda** pra voltar pra cá
        **${prefix}addme** pra me colocar no seu server`)
  },
}