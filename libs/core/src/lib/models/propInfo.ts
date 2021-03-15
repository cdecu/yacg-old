import {
  isPrimitive,
  modelInfo,
  objectInfo,
  propertyInfo,
  propertyType,
  valType,
} from './intfs';
import { Logger } from '../alice/logger';

/**
 * Object Property Abstract Info
 */
export class PropertyInfo implements propertyInfo {
  public type = propertyType.otUnknown;
  public subType?: PropertyInfo;
  public description = '';
  public required = true;
  private sampleTypes = new Set<propertyType>([]);
  private sampleValues = new Set<unknown>([]);
  private sampleSize = 0;

  /**
   * Just initialize name.
   * TODO I dont like to pass the logger everywhere but ...
   */
  constructor(public readonly name: string, public logger?: Logger) {}

  /**
   * Add a Sample value the the property. Detect the typeof
   * @param val
   * @returns {propertyInfo}
   */
  addSampleVal(val: unknown): propertyInfo {
    const vt = valType(val);
    this.type ||= vt;
    this.sampleSize += 1;
    this.sampleTypes.add(vt);
    this.sampleValues.add(val);
    return this;
  }

  /**
   * Detect type from sample values
   */
  public detectType(model: modelInfo, owner: objectInfo) {
    //  Build description
    this.description += Array.from(this.sampleValues)
      .map((v) => '\n@example ' + JSON.stringify(v))
      .join('');

    // Required if always present
    if (model.sampleSize > 1) {
      this.required = model.sampleSize === this.sampleSize;
    }

    // Count complex types (not primitive)
    let cntCplex = 0;
    this.sampleTypes.forEach((vt) => (cntCplex += isPrimitive(vt) ? 0 : 1));

    // Property is a Primitive type(s)
    if (!cntCplex) {
      if (this.sampleTypes.size === 1) {
        this.detectEnumType(model, owner);
      } else {
        this.detectUnionType(model, owner);
      }
      return;
    }

    // Property is a List
    if (this.sampleTypes.size === 1 && this.type === propertyType.otList) {
      // need to detect list elements type
      this.detectListSubType(model, owner);
      return;
    }

    // NO yet handled
    throw `Unsupported type ${model.name}.${owner.name}.${this.name}`;
  }

  /**
   * Try to find enum ex: CardColor : SPADE, HEART, DIAMOND, CLUB.
   * So type is converted to a Enum or a Type Alias.
   * @private
   */
  private detectEnumType(model: modelInfo, owner: objectInfo) {
    this.logger?.log(`EnumType ${model.name}.${owner.name}.${this.name}`);
  }

  /**
   * Try to find union type like number | string
   * So type is converted to a Type Alias.
   * @private
   */
  private detectUnionType(model: modelInfo, owner: objectInfo) {
    this.logger?.log(`UnionType ${model.name}.${owner.name}.${this.name}`);
  }

  /**
   * Extract list items type(s) from sampleValues
   * @param {modelInfo} model
   * @param {objectInfo} owner
   */
  public detectListSubType(model: modelInfo, owner: objectInfo) {
    const itemTypes = new Set<propertyType>([]);
    this.sampleValues.forEach((v: undefined[]) =>
      v.forEach((i) => itemTypes.add(valType(i)))
    );
    let cntCplex = 0;
    itemTypes.forEach((vt) => (cntCplex += isPrimitive(vt) ? 0 : 1));
    if (!cntCplex) {
      // Only Primitive types
      this.subType = new PropertyInfo(this.name + '.item', this.logger);
      this.sampleValues.forEach((v: undefined[]) =>
        v.forEach((i) => this.subType.addSampleVal(i))
      );
      return;
    }
    // List of Object ?
    this.logger?.log(`List ${model.name}.${owner.name}.${this.name} SubType`);
    this.subType = new PropertyInfo(this.name + '.item', this.logger);
  }
}
