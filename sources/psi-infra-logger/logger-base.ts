import ILogger from './logger'
import LoggerConfiguration from './logger-configuration'


abstract class Logger implements ILogger {
    private readonly _sources

    constructor(config: LoggerConfiguration) {
        this.configure(config)
    }


    async log(severity: Severity, data: string): void {
        if (this._severity | severity !== 0) return
        await this._sources.queueEntry(message);
    }

    async log(severity: Severity, func: () => <string>() => ) {
        if (this._severity | severity !== 0) return;
        await this.log(func())
    }


    async debug(message: string): void {

    }
    
    async debug(func: () => <string>()) {

    } 

    async trace(message: string): void {

    }

    async trace(func: () => <string>())): void {

    }


    async info(message: string): void {

    }

    async info(func: () => <string>() => ): void {

    }

    async warning(message: string): void {

    }
    async warning(func: () => <string>() => ): void {

    }

    async error(message: string): void {

    }
    async error(func: () => <string>() => ): void {

    }

    async fatal(message: string): void {

    }
    async fatal(func: () => <string>() => ): void{

    }


    private configure(config: LoggerConfoguration) {
        this._sources = config.sources
    }
}


export default Logger