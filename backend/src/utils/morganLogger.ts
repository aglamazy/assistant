import morgan from 'morgan';
import Logger from './logger';

morgan.token('custom', (req, res) => {
    const stack = (new Error()).stack?.split('\n')[12].trim();
    const match = stack?.match(/at .* \((.*):(\d+):(\d+)\)$/) || stack?.match(/at (.*):(\d+):(\d+)$/);
    let fileName = match ? match[1] : 'unknown';
    const lineNumber = match ? match[2] : 'unknown';

    const srcIndex = fileName.indexOf('src/');
    if (srcIndex >= 0) {
        fileName = fileName.substring(srcIndex);
    }

    return `${fileName}:${lineNumber}`;
});

const format = ':method :url :status :res[content-length] - :response-time ms [:custom]';

const morganLogger = morgan(format, {
    stream: {
        write: (message) => {
            Logger.api(message.trim());
        }
    }
});

export default morganLogger;
