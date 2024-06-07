import {Severity} from "../common/Severity";

Error.stackTraceLimit = 50;

const getStackInfo = (stackIndex: number) => {
    const stack = (new Error()).stack?.split('\n')[stackIndex].trim();
    const match = stack?.match(/at .* \((.*):(\d+):(\d+)\)$/) || stack?.match(/at (.*):(\d+):(\d+)$/);
    let fileName = match ? match[1] : 'unknown';
    const lineNumber = match ? match[2] : 'unknown';

    // Extract the part of the path after 'src'
    const srcIndex = fileName.indexOf('src/');
    if (srcIndex >= 0) {
        fileName = fileName.substring(srcIndex);
    }

    return { fileName, lineNumber };
};

const padLevel = (level: string, length: number): string => {
    return level.toUpperCase().padEnd(length);
};

class Logger {
    private logMessage(level: Severity, message: string, includeStack: boolean = true) {
        const { fileName, lineNumber } = getStackInfo(4);
        const timestamp = new Date().toISOString();
        const logLevel = padLevel(level, 6);
        const indent = level === 'api' ? '' : '  ';
        const location = includeStack ? `${fileName}:${lineNumber} - ` : '';

        console.log(`${timestamp} [${logLevel}] ${indent}${location}${message}`);
    }

    private logError(message: string) {
        const { fileName, lineNumber } = getStackInfo(4);
        const timestamp = new Date().toISOString();
        const logLevel = padLevel(Severity.ERROR, 6);
        console.error(`${timestamp} [${logLevel}]   ${fileName}:${lineNumber} - ${message}`);
    }

    debug(message: string) {
        this.logMessage(Severity.DEBUG, message);
    }

    info(message: string) {
        this.logMessage(Severity.INFO, message);
    }

    warn(message: string) {
        this.logMessage(Severity.WARN,message);
    }

    error(message: string) {
        this.logError(message);
    }

    api(message: string) {
        this.logMessage(Severity.API, message, false);
    }
}

export default new Logger();
