const { Client, Collection, MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const chalk = require("chalk")
const client = new Client({
    intents: 32767,
	autoReconnect: true,
	partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION", "MESSAGE", "USER"],

});

const logs = require('discord-logs');
logs(client);

const react = require("mongodb-reaction-role");
const mongoose = require("mongoose")
module.exports = client;
mongoose.connect("mongodb+srv://Legally_IU:pass@cluster0.nccab.mongodb.net/myFirstDatabase")
react.setURL("mongodb+srv://Legally_IU:pass@cluster0.nccab.mongodb.net/myFirstDatabase");
client.react = new Map(); 
client.fetchforguild = new Map() 


client.commands = new Collection();
client.slashCommands = new Collection();

// Initializing the project
require('./handler/slash_commands.js')(client);


client.on("ready", async() => {
  console.log(`${client.user.username} is ready to go`)
})
client.on('messageReactionAdd',async  (reaction  , user ) => {

  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  
    let rolefetch = await react.fetchrr(client, reaction.message.guild.id ,reaction.message.id , reaction.emoji.name);
    if(!rolefetch) return;
    let member = await reaction.message.guild.members.cache.get(user.id)
    if(!member.roles.cache.has(rolefetch.roleid)){
       await member.roles.add(rolefetch.roleid)
       console.log(`Role on ${reaction.emoji.name} has been given`)
       console.log(`Guild: ${reaction.message.guild.name}`)
    }
  });-

client.on('messageReactionRemove',async  (reaction, user) => {

  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
 
 let rolefetch = await react.fetchrr(client, reaction.message.guild.id ,reaction.message.id , reaction.emoji.name);
 if(!rolefetch) return;
 let member = await reaction.message.guild.members.cache.get(user.id)
 if(member.roles.cache.has(rolefetch.roleid)){
  await member.roles.remove(rolefetch.roleid)
  console.log(`Role on ${reaction.emoji.name} has been taken`)
  console.log(`Guild: ${reaction.message.guild.name}`)
  }
});
process.on("unhandledRejection",   ( reason, p) => {
    console.log( chalk.red("[antiCrash] :: Unhandled Rejection/Catch"));
    console.log(reason, p);
    
  });
  process.on("uncaughtException", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch");
    console.log(err, origin);
  });
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
  });
  process.on("multipleResolves", (type, promise, reason) => {
    console.log(" [antiCrash] :: Multiple Resolves");
    // console.log(type, promise, reason);
  });   

  client.on('guildMemberAdd', async(member) => {
    const Schema= require('./models/welcome.js')
        Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
      if (err) throw err
      if (!data) {
          return;
      }
      if (data) {
        let embed = new MessageEmbed()
        .setTitle(data.Embed.title)
        .setColor(data.Embed.color)
         if (data.Embed.footer) {
      embed.setFooter(data.Embed.footer) 
    }
    if (data.Embed.image) {
      embed.setImage(data.Embed.image)
    }
    if (data.Embed.thumb) {
      embed.setThumbnail(data.Embed.thumb)
    }
    if(data.Embed.desc){
      embed.setDescription(data.Embed.desc)
    }
    const channel = member.guild.channels.cache.get(data.Channel)
    channel.send({ embeds: [embed] })
      }

    })
  })
    client.on('guildMemberRemove', async(member) => {
    const Schema= require('./models/goodbye.js')
        Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
      if (err) throw err
      if (!data) {
          return;
      }
      if (data) {
        let embed = new MessageEmbed()
        .setTitle(data.Embed.title)
        .setColor(data.Embed.color)
         if (data.Embed.footer) {
      embed.setFooter(data.Embed.footer) 
    }
    if (data.Embed.image) {
      embed.setImage(data.Embed.image)
    }
    if (data.Embed.thumb) {
      embed.setThumbnail(data.Embed.thumb)
    }
    if(data.Embed.desc){
      embed.setDescription(data.Embed.desc)
    }
    const channel = member.guild.channels.cache.get(data.Channel)
    channel.send({ embeds: [embed] })
      }

    })
  })


  client.on("interactionCreate", async (interaction) => {
if(interaction.customId == "welcoem"){
  let embed = new MessageEmbed()
  .setTitle("Welcome Commands!")
  .setDescription("**/welcome** \n Setup the welcome config! \n\n **/disable-wecome** \n Reset the welcome config!")
  .setColor("RANDOM")
    interaction.update({ embeds: [embed]})
}
if(interaction.customId == "home"){
    let embed = new Discord.MessageEmbed()
    .setTitle("Help")
    .setDescription("Use the Buttons Below to get help! \n\n **Welcome**\n**Goodbye**\n**Other**")
    .setColor("RANDOM")
    interaction.update({ embeds: [embed]})
}
if(interaction.customId == "goodbye"){
  let embed = new MessageEmbed()
  .setTitle("Goodbye Commands!")
  .setDescription("**/goodbye** \n Setup the goodbye config! \n\n **/disable-goodbye** \n Reset the goodbye config!")
  .setColor("RANDOM")
    interaction.update({ embeds: [embed]})
}
if(interaction.customId == "other"){
  let embed = new MessageEmbed()
  .setTitle("Other Commands!")
  .setDescription("**/help** \n View all the commands! \n\n **/rradd** \n Add a reaction role to a message!")
  .setColor("RANDOM")
  interaction.update({ embeds: [embed]})
}
  })
client.login("token")