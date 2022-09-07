import { App } from '../App.js';
import { wemp } from './Commands.js';


export const CommandMapper = (app: App) => {
    const cmdMapper = new Map<string, Function>()
    cmdMapper.set(wemp.nginx, app.nginx)
    cmdMapper.set(wemp.phpCgi, app.phpCgi)
    return cmdMapper
}

