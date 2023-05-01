//  -- Variables -- \\
import { Client, GatewayIntentBits, Collection } from 'discord.js'
import { config } from 'dotenv'
import { readdirSync, existsSync } from 'fs'
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { join } from 'path'
import { settings } from "./settings"
config()

import { Keys, Bot } from './Types/index';
const keys: Keys = {
    ClientToken: process.env.TOKEN ?? 'null'
}

const bot = new Bot()
var commandFolder, eventFolder, componentsFolder

if (existsSync(`${__dirname}/Commands`)) {
    commandFolder = readdirSync(`${__dirname}/Commands`)
}
if (existsSync(`${__dirname}/Events`)) {
    eventFolder = readdirSync(`${__dirname}/Events`).filter((file) => file.endsWith(".ts") || file.endsWith('.js'))
}
if (existsSync(`${__dirname}/Components`)) {
    componentsFolder = readdirSync(`${__dirname}/Components`);
}

// -- Functions -- \\
if (Object.values(keys).includes('null')) throw new Error('[SCH]: Bot token is not provided in env file.');

(async () => {
    if (commandFolder) {
        for (const file of commandFolder) {
            const commandFiles = readdirSync(`${__dirname}/Commands/${file}`).filter((file) => file.endsWith(".ts") || file.endsWith('.js'));
            for (const cmd of commandFiles) {
                const { default: NewCommand } = await import(`./Commands/${file}/${cmd}`);
                bot.commands.set(NewCommand.data.name, NewCommand);
            }
        }
    }
    if (eventFolder) {
        for (const file of eventFolder) {
            const filePath = join(`${__dirname}/Events`, file);
            const { default: event } = await import(filePath);
            if (event.once) {
                bot.once(event.name, (...args) => event.execute(bot, ...args));
            } else {
                bot.on(event.name, (...args) => event.execute(bot, ...args));
            }
        }
    }
    if (componentsFolder) {
        for (const folder of componentsFolder) {
            const componentFiles = readdirSync(`${__dirname}/Components/${folder}`).filter(
                (file) => file.endsWith('.js') || file.endsWith('.ts')
            )

            const { buttons, menus, modals } = bot

            switch (folder.toLowerCase()) {
                case "buttons":
                    for (const file of componentFiles) {
                        const {default: button} = await import(`${__dirname}/Components/${folder}/${file}`);
                        buttons.set(button.data.name, button);
                    }
                    break;
                case "menus":
                    for (const file of componentFiles) {
                        const {default: menu} = await import(`${__dirname}/Components/${folder}/${file}`);
                        menus.set(menu.data.name, menu);
                    }
                    break;
                case "modals":
                    for (const file of componentFiles) {
                        const {default:modal} = await import(`${__dirname}/Components/${folder}/${file}`);
                        modals.set(modal.data.name, modal);
                    }
                    break;
            }
        }
    }
    const rest = new REST({ version: '9' }).setToken(keys.ClientToken);

    if (settings.slashCommands.global) {
        rest.put(Routes.applicationCommands(
            bot.user?.id ?? settings.botId
        ), { body: bot.commands }).then(() => {
            console.log('[BOT]', ': Registered application commands for global.')
        })
            .catch(console.error);
    } else {
        var cmds: Array<any> = []
        bot.commands.forEach(cmd => {
            cmds.push(cmd.data.toJSON())
        })
        settings.slashCommands.whitelistedGuilds.forEach(id => {
            rest.put(Routes.applicationGuildCommands(
                bot.user?.id ?? settings.botId, // Bot id
                id // Guild id
            ), { body: cmds })
                .then(async () => {
                    var guild = await bot.guilds.cache.get(id)
                    var guildName = guild?.name ?? id
                    console.log('[BOT]', ': Registered application commands for guild ', guildName)
                })
                .catch(console.error);
        })
    }
})()

// -- Logging in bot -- \\
bot.login(keys.ClientToken).catch(er => {
    console.error(`[SCH]: Error while logging in the bot!\n${er}`)
    process.exit(1)
})