module.exports = client => {

  const config = require("../config.json")
  const {prefix} = config
  const moment = require('moment');

    client.on('message', msg => {

      if (!msg.content.startsWith(prefix) || msg.author.bot) return;

      const content = msg.content

      console.log(content)

      if (content.toLowerCase().includes(`${prefix}horas`)  || 
      content.toLowerCase().includes(`${prefix}hours`)) {

        const indianRegex = /(\W|^)(in|india|indian)(\W|$)/gi;
        const brazilianRegex = /(\W|^)(br|brasil|brazil|brazilian)(\W|$)/gi;
        const polishRegex = /(\W|^)(pl|polish|poland)(\W|$)/gi;

        if (content.match(brazilianRegex)) {
            let brazilHours = moment(new Date()).subtract(3, 'hours').format("HH:mm")
            msg.channel.send(`Brazil: ${brazilHours}`)
        }
        if (content.match(indianRegex)) {
            let indiaHours = moment(new Date()).add(5, 'hours').add(30, 'minutes').format("HH:mm")
            msg.channel.send(`India: ${indiaHours}`)
        }
        if (content.match(polishRegex)) {
            let polishHours = moment(new Date()).add(1, 'hours').format("HH:mm")
            msg.channel.send(`Poland: ${polishHours}`)
        }

        if (!(content.match(polishRegex) || !(brazilianRegex) || !(indianRegex))) {
          if (content == `${prefix}horas`) {
              msg.channel.send(`
                Hey, bocó... não é assim, tenta isso aqui
                "${prefix}hours brasil india"        
          `)}else if (content == `${prefix}hours`) {
              msg.channel.send(`
                Hey, boy... you did it wrong, try this 
                "${prefix}hours brazil india"  
          `)}
        }
      }
  })
}
