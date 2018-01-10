import ILoggerSource from './logger-source'
import ILoggerMessageFormatter from './logger-message-formatter'
import Severity from './severity'


class ConsoleLoggerSource implements ILoggerSource {
    queueLogEntry(formatter: ILoggerMessageFormatter, severity: Severity, data: any) {
        return formatter.format(severity, data)
    }
}


export default ConsoleLoggerSource