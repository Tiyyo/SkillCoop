import { createLogger, format, transports, addColors } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);
const formatLogger = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.colorize({ all: true }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transportsLogger = [
  new transports.Console(),
  new transports.File({
    filename: 'logs/combined-%DATE%.log',
    zippedArchive: true,
    maxFiles: 5,
    level: 'info',
  }),
  new transports.File({
    filename: 'logs/error-%DATE%.log',
    zippedArchive: true,
    maxFiles: 5,
    level: 'error',
  }),
  new transports.File({
    filename: 'logs/access-%DATE%.log',
    zippedArchive: true,
    maxFiles: 5,
    level: 'http',
  }),
];

const logger = createLogger({
  level: level(),
  levels: levels,
  format: formatLogger,
  transports: transportsLogger,
});

export const winstonLogger = logger;
