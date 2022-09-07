import { Commands, wemp } from './cmd/Commands.js'
import readline from 'node:readline'
import { exec } from 'node:child_process'
import { AppInterface } from './types.js'

const running = (query: string, callback: any) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32': cmd = `tasklist`; break;
        default: break;
    }

    exec(cmd, (err, stdout, stderr) => {
        callback(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

export class App implements AppInterface {
    #cmd: Commands

    constructor(cmd: Commands) {
        this.#cmd = cmd

    }

    nginx(rl: readline.Interface) {
        running(wemp.nginx, async (status: boolean) => {
            if (status) {
                rl.question(
                    '  Nginx is already running. Would you like to stop it? (y/n): ',
                    async (answer: string) => {

                        if (answer === 'y') {
                            console.log('\n  Stoping Nginx ...\n')
                            await this.#cmd.stopNginx()
                        }
                        rl.prompt()
                    })
            } else {
                console.log('\n  Starting Nginx ...\n')
                await this.#cmd.startNginx()
                rl.prompt()
            }
        })
    }

    phpCgi(rl: readline.Interface) {
        running(wemp.phpCgi, async (status: boolean) => {
            if (status) {
                rl.question(
                    '  PHP CGI is already running. Would you like to stop it? (y/n): ',
                    async (answer: string) => {

                        if (answer === 'y') {
                            console.log('\n  Stoping PHP-CGI ...\n')

                            await this.#cmd.stopPHPCgi()
                        }
                        rl.prompt()
                    })
            } else {
                console.log('\n  Starting PHP-CGI ...\n')
                await this.#cmd.startPHPCgi()
                rl.prompt()
            }
        })
    }
}