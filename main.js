const bot = require('node-rocketchat-bot');
const keys = require('./keys.json');

bot({
    // recommended - using 'dotenv' library with .env file
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
        const operation = words[1] ? words[1].toLowerCase() : ''
        event.log.info(`operation is "${operation}"`)

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