const Discord = require('discord.js')
const bot = new Discord.Client()

 var Wallet = 0
 var Bank = 0
 var Money = Wallet + Bank

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
    if (message.content === ('!kq money')) {
 message.channel.send(`**Wallet :** ${Wallet} coins\n**Bank :** ${Bank} coins\n**Net worth :** ${Money} coins`)
    }
    if (message.content === ('!kq support')) { 
    message.channel.send( {embed:{
        color: 0x0fecec,
        title : `You need some help ? Join our support server !`,
        fields: [{
                name: "Kaze Support",
                value: "╚> https://discord.gg/WWTfvQ4 <╝"
        }]
      }} 
    )
    }
})




