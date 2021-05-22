import { modelInfo, intfInfo, propertyInfo } from './intfs';
import { PropertyInfo } from './propInfo';

/**
 * Object Abstract Info
 * a Object is (for us) just a list of properties
 */
export class IntfInfo implements intfInfo {
  public properties: PropertyInfo[] = [];
  public description = '';
  public sampleSize = 0;

  /**
   * Just initialize name,type
   */
  constructor(public name: string) {}

  /**
   * Clear
   */
  public clear(name: string, description: string): void {
    this.name = name;
    this.description = description;
    this.properties.length = 0;
    this.sampleSize = 0;
  }

  /**
   * Add or update a property from sample value
   * @param key
   * @param val
   */
  public addSampleProperty(key: string, val: unknown): propertyInfo {
    const found = this.properties.find((i) => i.name === key);
    if (found) {
      found.addSampleVal(val);
      return found;
    }
    const newOne = new PropertyInfo(key);
    this.properties.push(newOne);
    newOne.addSampleVal(val);
    return newOne;
  }

  /**
   * Detect properties type from sample values
   */
  public detectTypes(model: modelInfo) {
    this.properties.forEach((prop) => prop.detectType(model, this));
  }
}
