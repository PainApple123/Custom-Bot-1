const Discord = require("discord.js")
module.exports = {
  name: "help",
  botperm: ["SEND_MESSAGES", "EMBED_LINKS"],
  userperm: ["SEND_MESSAGES"],
  description: "✨Create a Goodbye",
  type: 'CHAT_INPUT',
  run: async (client, interaction, args) => {
    const row = new Discord.MessageActionRow()
    row.addComponents(
      new Discord.MessageButton()
      .setEmoji("🏠")
      .setCustomId("home")
      .setStyle("PRIMARY"),
            new Discord.MessageButton()
      .setLabel("Welcome")
      .setCustomId("welcoem")
      .setStyle("PRIMARY"),
            new Discord.MessageButton()
      .setLabel("Goodbye")
      .setCustomId("goodbye")
      .setStyle("PRIMARY"),
            new Discord.MessageButton()
      .setLabel("Other")
      .setCustomId("other")
      .setStyle("PRIMARY")
    )
    let embed = new Discord.MessageEmbed()
    .setTitle("Help")
    .setDescription("Use the Buttons Below to get help! \n\n **Welcome**\n**Goodbye**\n**Other**")
    .setColor("RANDOM")

    interaction.followUp({ embeds: [embed], components: [row] })



  },
};