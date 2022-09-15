import { Powershell } from './Powershell.js'
import { scriptsPath } from './helper/ps1-path.js'

export const wemp = {
    nginx: 'nginx',
    phpCgi: 'php-cgi',
    mysql: 'mysql' || 'mysqld'
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
        this.#path = scriptsPath()

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

    async startMySQL(args: string[] = []): Promise<void> {
        await this.shell.net([`start mysql`])
    }

    async stopMySQL(args: string[] = []): Promise<void> {
        await this.shell.net([`stop mysql`])

    }
}
