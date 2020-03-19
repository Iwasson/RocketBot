const bot = require('node-rocketchat-bot');
const keys = require('./keys.json');
const fs = require('fs');

//stores a playable characters information
class character {
  constructor(auth, name) {
    this.owner = auth;
    this.name = name;   //players name
    this.health = 100;  //health value
    this.mana = 100;    //mana value
    this.money = 0;     //amount of money they have
    this.exp = 0;       //how much experience they have
    this.level = 1;
    this.class = "none";
  }

}

//stores npc information
class npc {
  constructor(name) {
    this.name = name;
  }

}

//stores monster information
class monster {
  constructor(name, health, exp, money, ) {
    this.name = name;       //monster name
    this.health = health;   //monster health
    this.exp = exp;         //how much exp will be given if defeated
    this.money = money;     //how much money will be given if defeated
  }

}

//stores item information, every item will be randomly generated 
//based upon certain conditions
class item {

}

//stores the information for a single level of a dungeon
//randomly generated layout, items, monsters, etc...
class dungeon {

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
    if (event.flags.isMentioned) {
      const words = event.message.content.split(' ');
      //const operation = words[1] ? words[1].toLowerCase() : ''
      //event.log.info(`operation is "${operation}"`)

      //event.respond(`hi ${event.message.author.name} thanks for mentioning me`)
      processCommand(words, event);
    }
  }
});


function processCommand(words, event) {
  switch (words[1].toLowerCase()) {
    case "help":
      event.respond("You shall not pass!");
      break;
    case "create":
      makeAccount(event, words);
      break;
  }

}

//allows a user to make a character that is attached to
//their rocket nick, can only have one per person
async function makeAccount(event, words) {
  let auth = event.message.author.name;
  let made = false;
  //need to check and see if a user has an account already
  let characters = fs.readFileSync("./database.txt", "utf-8");
  let arrayCharacters = characters.split("\n");

  arrayCharacters.forEach(element => {
    if (element.startsWith(auth)) {
      event.respond("You already have a character!");
      made = true;
    }
  });

  if (made == false) {


    //attach name to the new character
    //let auth = event.message.author.name;
    let temp = new character(auth, words[2].toString());
    console.log("New Account made: " + words[2] + " by user: " + auth);

    //save the character to the database
    fs.appendFile('./database.txt', temp.owner + '/' + temp.name + '/' + temp.health + '/' + temp.mana + '/' + temp.money + '/' + temp.exp + '/' + temp.level + '/' + temp.class + '\n', (err) => {
      if (err) { throw (err); }
    });

    event.respond("Character " + temp.name + " created!");
  }
}