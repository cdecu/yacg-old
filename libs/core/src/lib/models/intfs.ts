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
export interface logHelper {
  /**
   * Print a log message.
   *
   * @param message  The message itself.
   */
  log(message: string): void;
  /**
   * Print a log message.
   *
   * @param message  The message itself.
   * @param level  The urgency of the log message.
   */
  log(message: string, level: LogLevel): void;
}

/**
 * AMI known types
 */
export const enum propertyType {
  otUnknown,
  otString,
  otBoolean,
  otInteger,
  otBigInt,
  otFloat,
  otList,
  otMap,
  otFunction,
}

/**
 * AMI Property Info.
 */
export interface propertyInfo {
  name: string;
  type: propertyType;
  description: string;
  required: boolean;
  subType: propertyInfo;
  addSampleVal: (val: any) => propertyInfo;
}

/**
 * AMI Object Info. A Object is (for us) just a list of properties.
 */
export interface objectInfo {
  name: string;
  description: string;
  properties: propertyInfo[];
}

/**
 * Abstract Model Info aka AMI
 */
export interface modelInfo {
  name: string;
  description: string;
  rootObject: objectInfo;
  /**
   * Number of sample data used to build the AMI.
   */
  sampleSize: number;
}

/**
 * Find the `value` type
 * @param {any} value
 * @returns {propertyType}
 */
export function valType(value: any): propertyType {
  if (Array.isArray(value)) return propertyType.otList;

  const type = typeof value;
  if (type === 'boolean') return propertyType.otBoolean;
  if (type === 'bigint') return propertyType.otBigInt;
  if (type === 'function') return propertyType.otFunction;
  if (type === 'string') return propertyType.otString;
  if (type === 'number') {
    if (Number.isInteger(value)) return propertyType.otInteger;
    return propertyType.otFloat;
  }
  if (type === 'object') {
    const tag = Object.prototype.toString.call(value);
    if (tag == '[object String]') return propertyType.otString;
    if (tag == '[object Number]') {
      if (Number.isInteger(value)) return propertyType.otInteger;
      return propertyType.otFloat;
    }
    return propertyType.otMap;
  }
  return propertyType.otUnknown;
}

/**
 * Find the `value` type, trying to JSON.parse string.
 * @param {any} value
 * @returns {propertyType}
 */
export function isJson(value: unknown): propertyType {
  const t = valType(value);
  if (t != propertyType.otString) return t;
  try {
    const obj = JSON.parse(<string>value);
    const t = valType(obj);
    if (t != propertyType.otString) return t;
    const n = Number.parseFloat(obj);
    if (Number.isNaN(n)) return propertyType.otString;
    if (Number.isInteger(n)) return propertyType.otInteger;
    // TODO detect objectTypes.otBigInt;
    return propertyType.otFloat;
  } catch (e) {
    return propertyType.otString;
  }
}

/**
 * A primitive (primitive value, primitive data type) is data that is not an object and has no methods.
 * @param {propertyType} value
 * @returns {boolean}
 */
export function isPrimitive(value: propertyType): boolean {
  switch (value) {
    case propertyType.otString:
    case propertyType.otBoolean:
    case propertyType.otInteger:
    case propertyType.otBigInt:
    case propertyType.otFloat:
      return true;
  }
  return false;
}
