#!/usr/bin/env node

import * as fs from 'fs';
import * as yargs from 'yargs';
import { Logger, LogLevel, ModelInfo, TSPrintor } from '@yacg/core';
import { isFile, loadJSONData, loadJSONFile } from './app/fileUtils';
import debug from 'debug';
import * as path from 'path';

const log = debug('yacg');

const ExitCodes = {
  Ok: 0,
  OptionError: 1,
  InvalidSrc: 5,
  ExceptionThrown: 6,
};

/**
 * Just a Logger implementation
 */
class cliLogger extends Logger {
  writeln(message: string, level: LogLevel) {
    log(message);
  }
}

/**
 * JSON to Typescript application entry point.
 * 1. Cmd Line Parsing using yargs
 * 2. Execute wanted command
 */
function main(): any {
  return yargs
    .env('YACG')
    .wrap(yargs.terminalWidth())
    .usage('Code Generator JSON to TS Tool \nUsage: $0 [options] cmd [params]')
    .example([
      ['$0 parse toto.json', 'Convert toto.json to typescript interface'],
      ['$0 --config "./config.json" cmd params', 'Use custom config file'],
    ])
    .config('config', (f: string) => JSON.parse(fs.readFileSync(f, 'utf-8')))
    .alias('c', 'config')
    .command(
      'parse <src>',
      'Test models parsing',
      (yargs: any) => yargs,
      (yargs: any) => parseCmd(yargs),
    )
    .command(
      '$0 <src>',
      'More Command',
      (yargs: any) => yargs,
      (yargs: any) => parseCmd(yargs),
    )
    .epilog('copyright 2021').argv;
}

/**
 * Parse command handler
 * 1. Load wanted sample JSON or YAML
 * 2. Build the Abstract Model Info (aka AMI)
 * 3. Print the generated AMI as Typescript code
 */
export function parseCmd(argv: any): void {
  console.log('> Parsing', argv.src);
  const fn = isFile(argv.src);
  const json = fn ? loadJSONFile(fn) : loadJSONData(argv.src);
  if (!json) {
    process.exit(ExitCodes.InvalidSrc);
  }

  const modelName = fn ? path.basename(fn, '.json') : 'json';
  console.log('> Loading JSON', modelName);
  const logger = new cliLogger();
  try {
    const printor = new TSPrintor(argv);
    const ami = new ModelInfo(modelName, 'MyIntf', logger);
    ami.loadJSON(json);
    const ts = printor.printModel(ami);
    console.log('\n', ts, '\n');
    process.exit(ExitCodes.Ok);
  } catch (e) {
    logger.error(e);
    console.error(e.message || e);
    process.exit(ExitCodes.ExceptionThrown);
  }
}

main();
