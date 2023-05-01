import { ActivityType, Events, CommandInteraction, EmbedBuilder, ButtonInteraction, StringSelectMenuInteraction, ModalSubmitInteraction } from 'discord.js'
import { settings } from '../settings'
import { Keys, Bot } from '../Types/index';

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(bot: Bot, i: CommandInteraction | ButtonInteraction | StringSelectMenuInteraction | ModalSubmitInteraction) {
        var embed = new EmbedBuilder()
        if (i.isCommand()) {
            const command = bot.commands.get(i.commandName);
            if (!command) return;
            if (command.info) {
                if (command.info.disabled) {
                    return
                }
                if (command.info.ownerOnly) {
                    var ownersarray = settings.owners
                    if (!ownersarray.includes(i.user.id)) {
                        embed.setColor(settings.embedColor.warning)
                        embed.setDescription('This command is owners only!')
                        await i.reply({ embeds: [embed], ephemeral: true })
                    }
                }
            }
            try {
                await command.execute(i);
            } catch (error) {
                embed.setColor(settings.embedColor.error)
                embed.setDescription(`There was an error while executing ${i.commandName} command\n${error}`)
                await i.reply({ embeds: [embed], ephemeral: true });
                console.error(error)
            }
        }
        if (i.isButton()) {
            const { buttons } = bot
            const customId = i.customId
            const button = buttons.get(customId);
            if (!button) {
                buttons.forEach(btn => {
                    var splitted = customId.split('_')
                    if (btn.data.name.startsWith(splitted[0])) {
                        btn.execute(i)
                        return
                    }
                })
                return console.warn(`Button with ID ${customId} not found.`)
            };
            try {
                await button.execute(i);
            } catch (er) {
                if (er) {
                    embed.setColor(settings.embedColor.error)
                    embed.setDescription(`There was an error while executing ${i.customId} button\n${er}`)
                    await i.reply({ embeds: [embed], ephemeral: true });
                    console.error(er)
                }
            }
        }
        if (i.isModalSubmit()) {
            const { modals } = bot
            const { customId } = i
            const modal = modals.get(customId);
            if (!modal) return console.warn(`Modal with ID ${customId} not found.`);
            try {
                await modal.execute(i);
            } catch (er) {
                if (er) {
                    embed.setColor(settings.embedColor.error)
                    embed.setDescription(`There was an error while executing ${i.customId} modal\n${er}`)
                    await i.reply({ embeds: [embed], ephemeral: true });
                    console.error(er)
                }
            }
        }
        if (i.isStringSelectMenu()) {
            const { menus } = bot
            const { customId } = i
            const menu = menus.get(customId);
            if (!menu) return console.warn(`Select Menu with ID ${customId} not found.`);
            try {
                await menu.execute(i);
            } catch (er) {
                if (er) {
                    embed.setColor(settings.embedColor.error)
                    embed.setDescription(`There was an error while executing ${i.customId} select menu\n${er}`)
                    await i.reply({ embeds: [embed], ephemeral: true });
                    console.error(er)
                }
            }
        }
    },
};