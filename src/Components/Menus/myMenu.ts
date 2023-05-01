import {
    StringSelectMenuInteraction,
} from 'discord.js';

module.exports = {
    data: {
        name: 'myMenu'
    },
    async execute(i:StringSelectMenuInteraction) {
        var values = i.values
        if (i.isRepliable()) {
            i.reply({content:`You choose the word ${values.join(',')}`,ephemeral:true});
        }
    }
}