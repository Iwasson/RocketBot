const bot = require('node-rocketchat-bot');
const keys = require('./keys.json');

//stores a playable characters information
class character 
{
  constructor(name) 
  {
    this.name = name;   //players name
    this.health = 100;  //health value
    this.mana = 100;    //mana value
    this.money = 0;     //amount of money they have
    this.exp = 0;       //how much experience they have
  }

}

//stores npc information
class npc
{
  constructor(name)
  {
    this.name = name;
  }

}

//stores monster information
class monster
{
  constructor(name, health, exp, money,)
  {
    this.name = name;       //monster name
    this.health = health;   //monster health
    this.exp = exp;         //how much exp will be given if defeated
    this.money = money;     //how much money will be given if defeated
  }

}

//stores item information, every item will be randomly generated 
//based upon certain conditions
class item
{
  
}

//stores the information for a single level of a dungeon
//randomly generated layout, items, monsters, etc...
class dungeon
{

}

bot({
    host: keys.host,
    username: keys.username,
    password: keys.password,
    // use ssl for https
    ssl: true,
    pretty: false,
    // join room(s)
    rooms: ['bots'],
    // when ready (e.log.info logs to console, can also console.log)
    onWake: async event => event.log.info(`${event.bot.username} ready`),
    // on message
    onMessage: async event => {
      if (event.flags.isMentioned)
      {
        const words = event.message.content.split(' ');
        //const operation = words[1] ? words[1].toLowerCase() : ''
        //event.log.info(`operation is "${operation}"`)

        //event.respond(`hi ${event.message.author.name} thanks for mentioning me`)
        processCommand(words, event);
      }
    }
  });


  function processCommand(words, event)
  {
      if(words[1] == "help")
      {
          event.respond("Here are the commands that you can use:");
      }
  }

  