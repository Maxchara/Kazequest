const Discord = require('discord.js')
const bot = new Discord.Client()


bot.on('ready', function () {
  console.log("Je suis connecté !")
  bot.user.setActivity(`!kq help`)
})

bot.login(process.env.TOKEN)

bot.on('message', message => {//pingpong
    if (message.content === ('ping') ) {
      message.channel.send('pong !')
    }
    if (message.content === ('Ping')){
      message.channel.send('Pong !')
    }

})




