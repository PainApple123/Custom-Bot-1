
const react = require("mongodb-reaction-role")
const Schema = require('../../models/goodbye.js')
const Discord = require("discord.js")
module.exports = {
  name: "disable-goodbye",
  botperm: ["MANAGE_ROLES"],
  userperm: ["ADMINISTRATOR", "ADD_REACTIONS"],
  description: "✨Create a Goodbye",
  type: 'CHAT_INPUT',


  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
   if(err) throw err
   if(!data) return interaction.followUp({ content: "You haven't setup the goodbye config"})

   if(data){
     await Schema.findOneAndDelete({ Guild: interaction.guild.id})
     return interaction.followUp({ content: "Done!"})
   }
})



  },
};