import { logHelper, modelInfo, objectInfo, propertyInfo } from './intfs';
import { PropertyInfo } from './propInfo';

/**
 * Object Abstract Info
 * a Object is (for us) just a list of properties
 */
export class ObjectInfo implements objectInfo {
  public readonly properties: PropertyInfo[] = [];
  public readonly description = '';

  /**
   * Just initialize name,type
   * TODO I dont like to pass the logger everywhere but ...
   */
  constructor(public readonly name: string, public logger?: logHelper) {}

  /**
   * Add or update a property from sample value
   * @param key
   * @param val
   * @private
   */
  public addSampleProperty(key: string, val: unknown): propertyInfo {
    const found = this.properties.find((i) => i.name === key);
    if (found) {
      found.addSampleVal(val);
      return found;
    }
    const newOne = new PropertyInfo(key, this.logger);
    this.properties.push(newOne);
    newOne.addSampleVal(val);
    return newOne;
  }

  /**
   * Detect properties type from sample values
   */
  public detectType(model: modelInfo) {
    this.properties.forEach((prop) => prop.detectType(model, this));
  }
}
