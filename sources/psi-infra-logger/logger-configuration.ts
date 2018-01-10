import ILoggerSource from './logger-source'
import ILoggerMessageFormatter from './logger-message-formatter'


class LoggerConfiguration {
    private readonly sources = [];

    addSource(source: ILoggerSource, formatter: ILoggerMessageFormatter) {
        this.sources.push({source,formatter})
        return this;
    }
}


export default LoggerConfiguration