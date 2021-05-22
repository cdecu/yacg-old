# Yacg library

Yacg Core, used by CLI json2code, ....

> run `nx run core:prepare` to compile the print templates

# Make Browser Compatible :(
tsPrintor.ts >>> 
import * as fs from 'fs';
import * as path from 'path';
/**
* Load Code Template
  */
  public async loadTemplate(tmpl: string): Promise<string> {
  return await import("../../../assets/" + tmpl);
  }


# Make Browser Compatible :(  logger.ts ------------------------------------------------------------------

/**
* A logger that will not produce any output.
*
* This logger also serves as the base class of other loggers as it implements all the required utility functions.
  */
  import { LogLevel } from '../models/intfs';

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
  // this.writeln(format(text, ...args), LogLevel.Verbose);
  }

/**
* Log the given warning.
*
* @param text  The warning that should be logged.
* @param args  The arguments that should be printed into the given warning.
  */
  public warn(text: string, ...args: string[]) {
  // this.writeln(Util.format(text, ...args), LogLevel.Warn);
  }

/**
* Log the given error.
*
* @param text  The error that should be logged.
* @param args  The arguments that should be printed into the given error.
  */
  public error(text: string, ...args: string[]) {
  // this.writeln(Util.format(text, ...args), LogLevel.Error);
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
