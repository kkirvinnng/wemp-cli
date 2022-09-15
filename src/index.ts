import readline from 'node:readline'
import { App } from './App.js'
import { CommandMapper } from './cmd/CommandMapper.js'
import { Commands } from './cmd/Commands.js'
import { Powershell } from './cmd/Powershell.js'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init() {

    try {
        const ps1 = new Powershell()
        const cmd = new Commands(ps1)
        const app = new App(cmd)
        const cmdMapper = CommandMapper(app)

        //create listener for the readline interface
        process.stdout.write('  Commands:  Nginx / PHP-CGI / MySQL / Exit\n\n')
        rl.setPrompt('>  ')
        rl.prompt()

        rl.on('line', async (input: string) => {
            let command = input.toLocaleLowerCase()
            if (command === 'exit') {
                console.log('\x1b[91m  Bye!\x1b[39m')
                process.exit(0)
            }

            if (cmdMapper.has(command)) {

                cmdMapper.get(command)?.call(app, rl)

            } else {
                rl.prompt()
            }
        })
    } catch (e: unknown) {
        console.error(e)
        process.exit(1)

    }
}

init().then()