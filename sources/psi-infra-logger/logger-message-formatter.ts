import Severity from './severity'


interface ILoggerMessageFormatter {
    format(severity: Severity, data: any);
}


export default Severity