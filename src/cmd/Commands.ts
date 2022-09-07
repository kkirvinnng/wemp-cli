import { Powershell } from './Powershell.js'

export const wemp = {
    nginx: 'nginx',
    phpCgi: 'php-cgi'
}

const ps1 = {
    startNginx: 'start-nginx.ps1',
    stopNginx: 'stop-nginx.ps1',
    startPhpCgi: 'start-php-cgi.ps1',
    stopPhpCgi: 'stop-php-cgi.ps1'
}

export class Commands {
    shell: Powershell
    #path: string
    constructor(powershell: Powershell) {
        this.shell = powershell
        this.#path = 'src/cmd/ps1'
    }

    async startNginx(args: string[] = []): Promise<void> {
        await this.shell.run([
            '-executionpolicy',
            'unrestricted',
            '-file',
            `${this.#path}/${ps1.startNginx}`
        ])
    }

    async stopNginx(args: string[] = []) {
        await this.shell.run([
            '-executionpolicy',
            'unrestricted',
            '-file',
            `${this.#path}/${ps1.stopNginx}`
        ])
    }

    async startPHPCgi(args: string[] = []) {
        await this.shell.run([
            '-executionpolicy',
            'unrestricted',
            '-file',
            `${this.#path}/${ps1.startPhpCgi}`
        ])
    }

    async stopPHPCgi(args: string[] = []) {
        await this.shell.run([
            '-executionpolicy',
            'unrestricted',
            '-file',
            `${this.#path}/${ps1.stopPhpCgi}`
        ])
    }
}

