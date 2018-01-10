import Severity from './severity'


interface ILogger {
    async log(severity: Severity, message: string): void
    async log(severity: Severity, func: ()<string>): void

    async debug(message: string): void
    async debug(func: ()<string>): void

    async trace(message: string): void
    async trace(func: ()<string>): void

    async info(message: string): void
    async info(func: ()<string>): void

    async warning(message: string): void
    async warning(func: ()<string>): void

    async error(message: string): void
    async error(func: ()<string>): void

    async fatal(message: string): void
    async fatal(func: ()<string>): void
}


export default ILogger