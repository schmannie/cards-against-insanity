import {
  createLogger,
  config,
  format,
  transports,
} from 'winston';

import { isDev } from './isDev.js';

const {
  combine,
  label,
  timestamp,
  cli,
  prettyPrint,
} = format;

const log = isDev ? (
  createLogger({
    levels: config.npm.levels,
    format: combine(
      timestamp({
        format: 'HH:mm:ss@YYYY-MM-DD',
      }),
      label({
        label: '@cai/server',
      }),
      prettyPrint(),
    ),
    transports: [
      new transports.Console({
        level: 'silly',
      }),
    ]
  })
) : (
  createLogger({
    levels: config.npm.levels,
    format: combine(
      timestamp({
        format: 'HH:mm:ss@YYYY-MM-DD',
      }),
      label({
        label: '@cai/server',
      }),
      cli(),
    ),
    transports: [
      new transports.Console({
        level: 'info',
      }),
    ]
  })
)

export { log };
