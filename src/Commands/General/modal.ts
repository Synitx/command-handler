import {
    SlashCommandBuilder,
    CommandInteraction,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('Modal command'),
    info: { ownerOnly: true },
    async execute(i: CommandInteraction) {
        const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');
        
        const liked = new TextInputBuilder()
			.setCustomId('sch')
			.setLabel("Reviews on Syn's Command Handler?")
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            ;

        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(liked);
        modal.addComponents(row);

        await i.showModal(modal)
    }
};