import { modelInfo, intfInfo, propertyInfo, propertyType, modelPrintor } from '../models/intfs';

//@ts-ignore
import * as Handlebars from 'handlebars/dist/cjs/handlebars';

/**
 * Print to typescript.
 */
export class PascalPrintor implements modelPrintor {
  /**
   * Typescript Interface
   * TODO Should use precompiled Handlebars Templates !
   * @type {string}
   * @private
   */
  private readonly tsIntfTmplSrc = `
{{~JDocDescr 0 description~}}
type {{name}}  = record
  {{#properties}}
  {{~JDocDescr 2 description~}}
  {{~Indent 2~}} {{name}} {{decl}} {{type}};
  {{/properties}}
  end;
`;
  /**
   * Compiled Handlebars Template
   * @type {any}
   * @private
   */
  private tsIntfTmpl: any = false;
  /**
   * prepared "scope" used to fill the Handlebars Template
   * @type {any}
   * @private
   */
  private scope?: any;

  constructor(private config: { [key: string]: unknown }) {
    // add custom helpers to Handlebars
    Handlebars.registerHelper('JDocDescr', (indent: number, val: string) => PascalPrintor.JDocDescr(indent, val));
    Handlebars.registerHelper('Indent', (indent: number) => ' '.repeat(indent));
    Handlebars.registerHelper('json', (context: any) => JSON.stringify(context, null, 2));
  }

  /**
   * printModel return the typescript code declaring ...
   * @param {modelInfo} model
   * @returns {string}
   */
  public printModel(model: modelInfo): string {
    if (!this.tsIntfTmpl) {
      this.tsIntfTmpl = Handlebars.compile(this.tsIntfTmplSrc, { noEscape: true });
    }
    let ts = '';
    if (model.childIntfs.length > 0) {
      model.childIntfs.forEach((o) => {
        this.prepareIntfScope(model, o);
        ts += this.tsIntfTmpl(this.scope) + '\n';
      });
    }
    this.prepareIntfScope(model, model.rootIntf);
    ts += this.tsIntfTmpl(this.scope);
    return ts;
  }

  //region Template Helpers
  /**
   * Format Description
   * @param {number} indent
   * @param {string} val
   * @constructor
   * @private
   */
  private static JDocDescr(indent: number, val: string): string | null {
    if (!val) return null;
    const lines = val.split('\n');
    const prefix = ' '.repeat(indent);
    if (lines.length > 1) {
      let descr = prefix + '{\n';
      lines.forEach((l) => (descr += prefix + l + '\n'));
      descr += prefix + '}\n';
      return descr;
    }
    return prefix + '// ' + val + '\n';
  }
  //endregion

  //region Handlebars Scope Builder functions
  /**
   * Convert Abstract model into scope to be consumed by handlebars
   * @param {ModelInfo} model
   * @param o
   * @private
   */
  private prepareIntfScope(model: modelInfo, o: intfInfo) {
    this.scope = {
      name: PascalPrintor.convertIntfName(o.name),
      description: o.description ?? model.description ?? this.config?.description,
      properties: this.buildProperties(o),
    };
  }
  private buildProperties(o: intfInfo): unknown[] {
    return o.properties.map((property) => {
      return {
        ...property,
        name: PascalPrintor.convertPropertyName(property.name),
        decl: ':',
        type: this.buildPropertyType(property),
      };
    });
  }

  private buildPropertyType(property: propertyInfo): string {
    if (property.simpleType) {
      switch (property.type) {
        case propertyType.otBigInt:
          return 'int64';
        case propertyType.otFloat:
          return 'extended';
        case propertyType.otInteger:
          return 'integer';
        case propertyType.otString:
          return 'string';
        case propertyType.otBoolean:
          return 'boolean';
        case propertyType.otList:
          return 'Array of ' + this.buildPropertyType(property.subType);
      }
    }
    return 'variant';
  }

  /**
   * Convert `value` to a valid TS Interface Name
   * @param {string} value
   * @returns {string}
   */
  private static convertIntfName(value: string): string {
    const intfName = value.replaceAll(/[." -]/g, '_');
    return intfName.replaceAll(/___|__/g, '_');
  }
  /**
   * Convert `value` to a valid TS Property Name
   * @param {string} value
   * @returns {string}
   */
  private static convertPropertyName(value: string): string {
    const intfName = value.replaceAll(/[." -]/g, '_');
    return intfName.replaceAll(/___|__/g, '_');
  }

  //endregion
}
