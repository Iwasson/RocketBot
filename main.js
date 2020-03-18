const bot = require('node-rocketchat-bot');

bot({
    // recommended - using 'dotenv' library with .env file
    host: 'HOSTNAME',
    username: 'USERNAME',
    password: 'PASSWORD',
    // use ssl for https
    ssl: true,
    // join room(s)
    rooms: ['bots'],
    // when ready (e.log.info logs to console, can also console.log)
    onWake: async event => event.log.info(`${event.bot.username} ready`),
    // on message
    onMessage: async event => {
      if (event.flags.isMentioned)
        event.respond(`hi ${event.message.author.name} thanks for mentioning me`)
    }
  });