import {
	SlashCommandBuilder,
    CommandInteraction
} from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test command'),
	info: { ownerOnly: true },
	async execute(i:CommandInteraction) {
		await i.reply({content:'This is a test!',ephemeral:true});
	}
};