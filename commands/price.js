const fetch = require('node-fetch');

module.exports = {
  commands: ['price', 'preço'],
  expectedArgs: '<quantity> <currency>',
  minArgs: 2,
  maxArgs: 2,
  callback: async (msg, arguments, text) => {

    let rupee = ['rupee', 'rupia', 'inr', 'rupees', 'rupias']
    let reals = ['reals', 'real', 'reais', 'brl', 'R$']
    let dolars = ['dollars', 'dollar', 'dólar', 'dólares', 'usd', 'doll']

    const split = msg.content.split(/[ ]+/)

    const qtd = split[1]
    const currency = split[2]
    let cotation

    if(rupee.includes(currency)){
        await fetch(`http://apilayer.net/api/live?access_key=9551e59cd68701cacbeaefad62904e03&currencies=INR,BRL&source=USD&format=1`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(resp => cotation = resp.quotes)

        const {USDINR, USDBRL} = cotation
        
        msg.channel.send(`${qtd} Rupees `)
        msg.channel.send(`${(qtd/USDINR).toFixed(2)} Dollars `)
        msg.channel.send(`${((qtd/USDINR)*USDBRL).toFixed(2)} Reals `)

      } else if(reals.includes(currency)){
        await fetch(`http://apilayer.net/api/live?access_key=9551e59cd68701cacbeaefad62904e03&currencies=INR,BRL&source=USD&format=1`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(resp => cotation = resp.quotes)

        const {USDINR, USDBRL} = cotation
        
        msg.channel.send(`${((qtd/USDBRL)*USDINR).toFixed(2)} Rupees `)
        msg.channel.send(`${(qtd/USDBRL).toFixed(2)} Dollars `)
        msg.channel.send(`${qtd} Reals `)

      }else if(dolars.includes(currency)){
        await fetch(`http://apilayer.net/api/live?access_key=9551e59cd68701cacbeaefad62904e03&currencies=INR,BRL&source=USD&format=1`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(resp => cotation = resp.quotes)

        const {USDINR, USDBRL} = cotation
        
        msg.channel.send(`${(USDINR*qtd).toFixed(2)} Rupees `)
        msg.channel.send(`${qtd} Dollars `)
        msg.channel.send(`${(qtd*USDBRL).toFixed(2)} Reals `)

      }
  },
}