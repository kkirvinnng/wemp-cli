import { exec, spawn } from 'node:child_process'
import AppError from '../errors/AppError.js'


export class Powershell {
    #executable: string
    constructor(executable: string = 'powershell') {
        this.#executable = executable
    }

    async run(args: readonly string[], opts = {}): Promise<number> {

        const child = spawn(this.#executable, args, {
            shell: true,
            stdio: ['pipe', process.stdout, process.stderr],
            ...opts,
        })

        return new Promise((resolve, reject) => {

            child.on('error', reject)

            child.on('exit', (code) => {
                if (code === 0) {
                    resolve(code)
                } else {
                    const e = new AppError('Process exited with error code ' + code, code!, 'App Error')
                    reject(e)
                }
            })
        })
    }

    async net(args: readonly string[], opts = {}): Promise<any> {
        exec(`powershell -command "start-process cmd -verb runas -argumentlist '/c net ${args}' -WindowStyle Hidden  "`);
    }
}