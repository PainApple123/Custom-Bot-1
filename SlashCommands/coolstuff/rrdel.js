
const react = require("mongodb-reaction-role")
const Schema = require('../../models/welcome.js')
const Discord = require("discord.js")
module.exports = {
  name: "welcome",
  botperm: ["MANAGE_ROLES"],
  userperm: ["ADMINISTRATOR", "ADD_REACTIONS"],
  description: "✨Create a Welcome",
  type: 'CHAT_INPUT',
  options: [
    {
      name: "channel",
      required: true,
      description: "lol",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
    },
    {
      name: "embedtitle",
      required: true,
      type: "STRING",
      description: "Message",
    },
        {
      name: "embedcolor",
      required: true,
      type: "STRING",
      description: "Message",
    },
    {
      name: "embeddescription",
      description: "lolsdf",
      required: false,
      type: "STRING",
    },
    {
      name: "embedfooter",
      required: false,
      description: "lolsdf",
      type: "STRING"
    },
    {
      name: "embedimage",
      required: false,
      description: "lolsdf",
      type: "STRING"
    },
    {
      name: "embedthumbnail",
      required: false,
      description: "lolsdf",
      type: "STRING"
    },
  ],




  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const channel = interaction.options.getChannel("channel")
    const embtitle = interaction.options.getString("embedtitle")
    const embfooter = interaction.options.getString("embedfooter")
        const embdesc = interaction.options.getString("embeddescription")
    const embimage = interaction.options.getString("embedimage")
    const embthumb = interaction.options.getString("embedthumbnail")
        const embcolor = interaction.options.getString("embedcolor")
 if(!embcolor.match(`^#(?:[0-9a-fA-F]{3}){1,2}$`)) return interaction.followUp({ content: "Thats not a valid color! \n ALl colors need to be in Hex COlor COde Format!"})
    let rcs = {
      title: embtitle,
      color: embcolor
    }
    if (embfooter) {
      rcs.footer = embfooter
    }
    if (embimage) {
      rcs.image = embimage
    }
    if (embthumb) {
      rcs.thumb = embthumb
    }
    if(embdesc){
      rcs.desc = embdesc
    }
    console.log(rcs)
    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (err) throw err
      if (data) {
        return interaction.followUp({ content: "You have already setup Welcoming! You must reset it before doing this again" })
      }
      if (!data) {
        new Schema({
          Guild: interaction.guild.id,
          Channel: channel.id,
          Embed: rcs
        }).save()
        interaction.followUp({ content: "Done!"})
      }

    })



  },
};