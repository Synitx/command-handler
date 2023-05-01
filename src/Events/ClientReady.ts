import { ActivityType, Events } from 'discord.js'
import {settings} from '../settings'
import { Keys, Bot } from '../Types/index';

/*

     -- Formats for acitivty --

      {prefix} - Bot's prefix
      {username} - Bot's username
      {id} - Bot's id
      {guilds} - Amount of guilds bot is in
      {users} - Amount of total bot users

*/

const presence = {
    enabled: true,
    status: '{prefix}help | {guilds} servers'
}

const getFormattedText = async (text: string, bot: Bot) => {
    const guilds = bot.guilds.cache.size;
    const users = bot.users.cache.size;
    const botId = bot.user?.id;
    const username = bot.user?.username;

    return text
        .replace('{prefix}', settings.prefix ?? '/')
        .replace('{guilds}', guilds.toString())
        .replace('{users}', users.toString())
        .replace('{id}', botId?.toString() ?? '0')
        .replace('{guilds}', username?.toString() ?? '0');
};

export default {
    name: Events.ClientReady,
    once: true,
    async execute(bot: Bot) {
        console.log(`[SCH]: Logged in as ${bot.user?.username}`)
        if (presence.enabled) {
            var status = await getFormattedText(presence.status,bot)
            bot.user?.setActivity(status,
                {
                    type: ActivityType.Watching
                }
            )
        }
    },
};