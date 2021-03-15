import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { convertTSIntfName, convertTSPropertyName } from '../ts/tsUtils';
import { modelInfo, propertyInfo, propertyType } from '../models/intfs';

/**
 * Print to typescript.
 */
export class TSPrintor {
  private scope?: unknown;

  constructor(private config: { [key: string]: unknown }) {
    handlebars.registerHelper('JDocDescr', (indent: number, val: string) =>
      TSPrintor.JDocDescr(indent, val)
    );
    handlebars.registerHelper('Indent', (indent: number) => ' '.repeat(indent));
    handlebars.registerHelper('json', (context) => {
      return JSON.stringify(context, null, 2);
    });
  }

  //region Template Helpers
  /**
   * Load Code Template
   */
  public loadTemplate(tmpl: string): string {
    const fn = path.join(__dirname, './assets/tsTemplates', tmpl);
    return fs.readFileSync(fn, 'utf8');
  }

  /**
   * Format Description
   * @param {number} indent
   * @param {string} val
   * @constructor
   * @private
   */
  private static JDocDescr(indent: number, val: string): string {
    if (!val) return null;
    const lines = val.split('\n');
    const prefix = ' '.repeat(indent);
    if (lines.length > 1) {
      let descr = prefix + '/**\n';
      lines.forEach(
        (l) => (descr += l ? prefix + ' * ' + l + '\n' : prefix + ' *\n')
      );
      descr += prefix + ' */\n';
      return descr;
    }
    return prefix + '/* ' + val + ' */\n';
  }
  //endregion

  public printModel(model: modelInfo): string {
    const tmplSrc = this.loadTemplate('tsInterface.tmpl');
    const tmpl = handlebars.compile(tmplSrc, { noEscape: true });
    this.buildModel(model);
    return tmpl(this.scope);
  }

  /**
   * Convert Abstract model into scope to be consumed by handlebars
   * @param {ModelInfo} model
   * @private
   */
  private buildModel(model: modelInfo) {
    this.scope = {
      name: convertTSIntfName(model.name),
      description:
        this.config?.description ??
        model.description ??
        model.rootObject.description,
      properties: this.buildProperties(model),
    };
  }
  private buildProperties(model: modelInfo): unknown[] {
    return model.rootObject.properties.map((property) => {
      return {
        ...property,
        name: convertTSPropertyName(property.name),
        decl: property.required ? ' :' : '?:',
        type: this.buildPropertyType(property),
      };
    });
  }
  private buildPropertyType(property: propertyInfo): string {
    switch (property.type) {
      case propertyType.otBigInt:
      case propertyType.otFloat:
      case propertyType.otInteger:
        return 'number';
      case propertyType.otString:
        return 'string';
      case propertyType.otList:
        return this.buildPropertyType(property.subType) + '[]';
    }
    return 'unknown';
  }
}
