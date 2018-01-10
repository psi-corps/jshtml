import Severity from './severity'
import ILoggerMessageFormatter from './logger-message-formatter'


interface ILoggerSource {
    queueLogEntry(formatter: ILoggerMessageFormatter, severity: Severity, data: any)
}


export default ILoggerSource