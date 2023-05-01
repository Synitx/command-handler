import {
    ModalSubmitInteraction,
} from 'discord.js';

module.exports = {
    data: {
        name: 'myModal'
    },
    async execute(i:ModalSubmitInteraction) {
        var input = i.fields.getTextInputValue('sch')
        if (i.isRepliable()) {
            i.reply({content:`Your review on Syn's command hancler:\n\`\`\`${input}\`\`\``,ephemeral:true});
        }
    }
}