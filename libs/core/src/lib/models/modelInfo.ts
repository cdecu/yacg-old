import { logHelper, modelInfo } from './intfs';
import { PropertyInfo } from './propInfo';
import { ObjectInfo } from './objectInfo';

/**
 * Abstract Model Info
 */
export class ModelInfo implements modelInfo {
  public readonly name: string;
  public readonly description = '';
  public readonly rootObject: ObjectInfo;
  // public readonly properties: PropertyInfo[];
  public sampleSize = 0;

  /**
   * Abstract Model Info constructor
   * TODO I dont like to pass the logger everywhere but ...
   */
  constructor(modelName: string, rootName = 'MyIntf', public logger?: logHelper) {
    this.name = modelName;
    this.rootObject = new ObjectInfo(rootName, logger);
  }

  /**
   * Load from a JSON Map or Array
   * @param json
   */
  public loadJSON(json: any): void {
    if (Array.isArray(json)) {
      this.logger?.log(`load Sample Array of ${json.length}`);
      this.sampleSize = json.length;
      if (!this.sampleSize) throw 'Empty Array';
      json.forEach((i) => this.parseJSON(i));
      this.detectTypes();
      return;
    }
    if (typeof json === 'object') {
      this.logger?.log('load Sample');
      this.sampleSize = 1;
      this.parseJSON(json);
      this.detectTypes();
      return;
    }
    throw 'Unsupported JSON';
  }

  /**
   * Add all object entries as property
   * @param json
   */
  public parseJSON(json: any): void {
    Object.entries(json).forEach(([key, val]) => this.rootObject.addSampleProperty(key, val));
  }

  /**
   * Detect properties type from sample values
   * @private
   */
  private detectTypes() {
    this.rootObject.detectType(this);
  }
}
