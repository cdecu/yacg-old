import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import yamlInc from 'yaml-include';
import debug from 'debug';
const logInfo = debug('yacg:app');
const logError = debug('yacg:error');

/**
 * Check if file exists
 */
export function isFile(fn: string): false | string {
  logInfo('> Test file:', fn);
  try {
    if (fs.existsSync(fn)) {
      return path.resolve(fn);
    }

    const bn = path.basename(fn);
    const fn1 = path.join(__dirname, bn);
    if (fs.existsSync(fn)) {
      return path.resolve(fn1);
    }

    const fn2 = path.join(process.cwd(), bn);
    if (fs.existsSync(fn)) {
      return path.resolve(fn2);
    }

    return false;
  } catch (e) {
    console.error(e.message || e);
    logError(e);
    return false;
  }
}
/**
 * Load JSON or YAML file
 */
export function loadJSONFile(fn: string): string | any {
  logInfo('> Load file:', fn);
  try {
    const d = fs.readFileSync(fn, { encoding: 'utf-8' });
    const fe = path.extname(fn).toLowerCase();
    switch (fe) {
      case '.json':
        logInfo('> JSON Parse');
        return JSON.parse(d);
      case '.yaml':
        logInfo('> YAML Parse');
        yamlInc.setBaseFile(fn);
        return yaml.load(d, {
          schema: yamlInc.YAML_INCLUDE_SCHEMA,
          filename: yamlInc.basefile,
        });
    }
    console.error('Unsupported file ', fe);
    return false;
  } catch (e) {
    console.error(e.message || e);
    logError(e);
    return false;
  }
}
/**
 * Load JSON or YAML file
 */
export function loadJSONData(d: string): string | any {
  logInfo('> Load as data');
  try {
    return JSON.parse(d);
  } catch (e) {
    console.error(e.message || e);
    logError(e);
    return false;
  }
}
