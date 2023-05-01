import {Collection,Client} from 'discord.js'
export interface Keys {
    ClientToken:string;
}

import {settings} from '../settings'

export class Bot extends Client {
    public commands: Collection<string, any>;
    public buttons: Collection<string, any>;
    public menus: Collection<string, any>;
    public modals: Collection<string, any>;

    constructor() {
        super({
            intents: settings.botIntents
        });

        this.commands = new Collection();
        this.buttons = new Collection();
        this.menus = new Collection();
        this.modals = new Collection();
    }
}