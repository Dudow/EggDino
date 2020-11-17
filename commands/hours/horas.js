const { prefix } = require('../../config.json')
const moment = require('moment');

module.exports = {
  commands: 'horas',
  expectedArgs: '<país1> <país2>',
  minArgs: 1,
  maxArgs: 3,
  callback: (msg, arguments, text) => {
    
    const indianRegex = /(\W|^)(in|india|indian)(\W|$)/gi;
    const brazilianRegex = /(\W|^)(br|brasil|brazil|brazilian)(\W|$)/gi;
    const polishRegex = /(\W|^)(pl|polish|poland)(\W|$)/gi;

    const content = msg.content

    if (content.match(brazilianRegex)) {
        let brazilHours = moment(new Date()).subtract(3, 'hours').format("HH:mm")
        msg.channel.send(`Brasil: ${brazilHours}`)
    }
    if (content.match(indianRegex)) {
        let indiaHours = moment(new Date()).add(5, 'hours').add(30, 'minutes').format("HH:mm")
        msg.channel.send(`India: ${indiaHours}`)
    }
    if (content.match(polishRegex)) {
        let polishHours = moment(new Date()).add(1, 'hours').format("HH:mm")
        msg.channel.send(`Polônia: ${polishHours}`)
    }    
  },
}