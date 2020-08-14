const Discord = require('discord.js')
const bot = new Discord.Client()
const commande = '!kq '
const fs = require('fs');
var profiles = JSON.parse(fs.readFileSync('SoulsStorage.json', 'utf8'));
var inventories = JSON.parse(fs.readFileSync('Items.json', 'utf8'));


bot.on('ready', function () {
  console.log("Je suis connecté !")
  bot.user.setActivity(`!kq help`)
})

bot.login(process.env.TOKEN)


bot.on('message', message => {                                 //start
  start : if (message.content === (commande+'start') ) {
    
    var newgamerid = message.author.id;
    var newgamername = message.author.username;
      for( i = 0; i < profiles.length; i++){
        if (profiles[i][0]===newgamerid){
          message.channel.send('```Sorry but you already started a quest ! You can\'t have two profiles.```')
          break start};
      };

    message.channel.send("```Your quest has started ! Type “!kq profile” to see your coins, and more !```");
    profiles.push([newgamerid, newgamername , 0, 100, 0 , 0]); //de la forme  id, pseudo, xp, nextlvl, wallet, bank
    inventories.push([newgamerid, ' sword']);
    save()
    return
  }
})                                                             //________________

bot.on('message', message => {                                 //pingpong
    if (message.content === ('ping') ) {
      message.channel.send('pong !')
    }
    if (message.content === ('Ping')){
      message.channel.send('Pong !')
    }                                                         //____________
    if (message.content === (commande+'item') ) {              //item
    gamerid = message.author.id
    for( i = 0; i < inventories.length; i++){
      if (gamerid === (inventories[i][0]) ){
        items_a_affiche=[]
        for( j = 1; j < inventories[i].length; j++){
        items_a_affiche.push(inventories[i][j])}
        message.channel.send({embed: {
          color: 0x00ff24,
          fields : [{
          name : `Here are your items :`,
          value : `${items_a_affiche}`}]
        }});
      }
    }save()
  return}
                                                          //__________________
  if (message.content === (commande+'help')){                  //help
      message.channel.send({embed: {
          color: 3447003,
          title: "COMMANDS",
          fields : [{
          name : `Quest commands :`,
          value : "**!kq start** - Start your quest\n**!kq profile** - Show your quest profile\n**!kq daily** - Give you your daily reward"}]
        }});
    }                                                     //_________________
  if (message.content === (commande+'profile') ) {        //profile
    gamerid = message.author.id
    for( i = 0; i < profiles.length; i++){
      if (gamerid === (profiles[i][0]) ){
        message.channel.send({embed: {
          color: 0x0cd3f8,
          title : `**${profiles[i][1]}'s profile**`,
          description : `**XP** : ${profiles[i][2]} xp points\n**XP to reach the next lvl** : ${profiles[i][3]} xp points\n**Wallet** : ${profiles[i][4]} coins\n**Bank** : ${profiles[i][5]} coins\n**Net worth** : ${profiles[i][5]+profiles[i][4]} coins`
          
        }});
      }
    }save()
  return}                                             //__________________________
  
  if (message.content === (commande+'add') ) {       //add an item
    gamerid = message.author.id
     for( i = 0; i < inventories.length; i++){
      if (gamerid === (inventories[i][0]) ){
        inventories[i].push(' item1')
        message.channel.send('```You get a new Item ! Type “!kq items” to see it !```')

      }}save()
    return}                                          //________________________
 
 
    if (message.content === (commande+'daily') ) {      //Daily 
      gamerid = message.author.id
        for( i = 0; i < profiles.length; i++){
          if (gamerid === (profiles[i][0]) ){
            profiles[i][4]+= 2000
            message.channel.send('```You received your daily 2000 coins ! Type “!kq profile" to see your current amount of coins.```')
          }
        }save()
                                                   //_____________________

    }
 if (message.content === (commande+'support')) {       //support
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
})                           //_______________________

 if (message.content === (commande+'exist')) { 
   var exists = fs.existsSync('Items.json');
if (exists) {message.channel.send("bravo tu t'es fait enculé")}
else{message.channel.send("cheh")}

}

function save(){
  fs.writeFile('SoulsStorage.json', JSON.stringify(profiles), 'utf8', (err) => {
    if (err) console.error(err);
  })
  fs.writeFile('Items.json', JSON.stringify(inventories), 'utf8', (err) => {
    if (err) console.error(err);
  })
}
