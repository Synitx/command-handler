import {
    ButtonInteraction,
} from 'discord.js';

module.exports = {
    data: {
        name: 'test_btn'
    },
    async execute(i:ButtonInteraction) {
        if (i.isRepliable()) {
            i.reply({content:'You clicked a button wtih 💀 emoji',ephemeral:true});
        }
    }
}