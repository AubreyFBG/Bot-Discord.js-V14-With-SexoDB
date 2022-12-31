//Bot
const Discord = require("discord.js");
const { GatewayIntentBits } = require("discord.js")
const config = require("./Config.json")
console.log(GatewayIntentBits)
const client = new Discord.Client({
    intents: [ 
GatewayIntentBits.Guilds, 
GatewayIntentBits.GuildMessages,
GatewayIntentBits.GuildMessageReactions,
GatewayIntentBits.GuildMessageTyping,
GatewayIntentBits.MessageContent, 
GatewayIntentBits.GuildMembers,  
GatewayIntentBits.GuildVoiceStates, 
         ] });

module.exports = client;

client.slashCommands = new Discord.Collection();

require("./src/Handler")(client);

client.login(config.BotToken);

//SexoDB
const sexodb = require("sexodb")

client.dbUsers = new sexodb("./src/Database/users.json")