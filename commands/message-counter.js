const mongo = require('../db/mongo')
const messageCountSchema = require('../schemas/message-count-schema')


module.exports = client => {
  client.on('message', async msg => {
    const id = msg.author.id

    await mongo().then(async mongoose => {
        try{
          await messageCountSchema.findOneAndUpdate({
            _id: id
          }, {
            $inc: {
              'messageCount': 1
            }
          },{
            upsert: true,
          }).exec()
        } catch (e) {
          console.log(e)
        }
        
    })
  })
}