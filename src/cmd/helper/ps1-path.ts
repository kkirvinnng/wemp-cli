import { cwd } from 'node:process'

export const scriptsPath = (): string => {
    const dirname = cwd()

    return dirname.includes('WEMP')
        ? dirname.concat('/ps1')
        : dirname.concat('/src/cmd/ps1')
}