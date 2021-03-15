import * as Util from 'util';

/**
 * List of known log levels. Used to specify the urgency of a log message.
 */
export const enum LogLevel {
  Verbose,
  Info,
  Warn,
  Error,
}

/**
 * A logger that will not produce any output.
 *
 * This logger also serves as the base class of other loggers as it implements all the required utility functions.
 */

export abstract class Logger {
  /**
   * Print a log message.
   *
   * @param message  The message itself.
   * @param level  The urgency of the log message.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public log(message: string, level: LogLevel = LogLevel.Info) {
    this.writeln(message, level);
  }

  /**
   * Verbose the given warning.
   *
   * @param text  The warning that should be logged.
   * @param args  The arguments that should be printed into the given warning.
   */
  public verbose(text: string, ...args: string[]) {
    this.writeln(Util.format(text, ...args), LogLevel.Verbose);
  }

  /**
   * Log the given warning.
   *
   * @param text  The warning that should be logged.
   * @param args  The arguments that should be printed into the given warning.
   */
  public warn(text: string, ...args: string[]) {
    this.writeln(Util.format(text, ...args), LogLevel.Warn);
  }

  /**
   * Log the given error.
   *
   * @param text  The error that should be logged.
   * @param args  The arguments that should be printed into the given error.
   */
  public error(text: string, ...args: string[]) {
    this.writeln(Util.format(text, ...args), LogLevel.Error);
  }

  /**
   * Print a log message.
   *
   * @param message  The message itself.
   * @param level  The urgency of the log message.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public abstract writeln(message: string, level: LogLevel);
}
