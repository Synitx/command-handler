import {
    SlashCommandBuilder,
    CommandInteraction,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Button command'),
    info: { ownerOnly: true },
    async execute(i: CommandInteraction) {

        var row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('test_btn')
                    .setLabel('Click me!')
                    .setEmoji('💀')
                    .setStyle(ButtonStyle.Secondary)
            )

        await i.reply({ content: 'Click the button below!', components: [row], ephemeral: true });
    }
};