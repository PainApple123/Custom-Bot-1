const client = require("../index");
const Discord = require("discord.js")
client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];
        const userperm = interaction.member.permissions.has(cmd.userperm);
        const embed = new Discord.MessageEmbed()
        .setTitle("Missing Permissions")
        .setDescription("**:x: |** You are Missing some permissions!")
        .setColor("#cf0e32")
        .addFields(
            { name: 'Permission(s) :', value: `\`\`\`${cmd.userperm || []}\`\`\`` }
        )
        const botmebed = new Discord.MessageEmbed()
        .setTitle("Missing Permissions")
        .setDescription(":x: I am Missing some permissions!")
        .setColor("#cf0e32")
        .addFields(
            { name: 'Permission(s) :', value: `\`\`\`${cmd.userperm || []}\`\`\`` }
        )
        if (!userperm) return interaction.followUp({ embeds: [embed] });

        const botperm = interaction.guild.me.permissions.has(cmd.botperm);
        if (!botperm) return interaction.followUp({ embeds: [botmebed] });


        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling

});
