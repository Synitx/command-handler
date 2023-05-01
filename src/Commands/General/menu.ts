import {
    SlashCommandBuilder,
    StringSelectMenuInteraction,
    StringSelectMenuBuilder,
    ActionRowBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Select menu command'),
    info: { ownerOnly: true },
    async execute(i: StringSelectMenuInteraction) {

        const select = new StringSelectMenuBuilder()
            .setCustomId('myMenu')
            .setPlaceholder('Make a selection!')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('S')
                    .setDescription('The letter S.')
                    .setValue('s'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Y')
                    .setDescription('The letter Y.')
                    .setValue('y'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('N')
                    .setDescription('The letter N.')
                    .setValue('n'),
            );

        var row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                select
            )

        await i.reply({ content: 'Choose an option below!', components: [row], ephemeral: true });
    }
};