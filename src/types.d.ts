export interface AppInterface {
    nginx: (rl: readline.Interface) => void
    phpCgi: (rl: readline.Interface) => void
}
