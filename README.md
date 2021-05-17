# Yacg

Spare time project !  
Yet another Code generator. It generates mostly interface definitions.
NO it is not yacc :( it is just a small personal project.
- Transform json data into code interface.   
  - guess required
  - guess if enum 
- Transform json schemas into code interface.  
  

## Installation

Yacg can be used as a CLI or as a library, just get it as a NPM package or clone the source.
```text
npm install @yacg/core
npm install @yacg/json2code --save-dev
```

## Documentation

For now, just read the code :(

## Target languages
- typescript
- pascal
- python

## Development
Yacg is developed in typescript, using:
- [Nx Workspace](https://nx.dev). (I know it is a bazooka for a small project)   
- [jest](https://jestjs.io/) as testing framework.
- [eslint](https://eslint.org/) as code linter.
- [prettier](https://prettier.io/) as code formatted.
- [typedoc](https://typedoc.org/) as Documentation generator.  
and of course yarn, webpack, ....


## Planning
It is just the beginning but ... 
- core lib 
   - add pascal
   - use code re formatter  
- cli apps 
   - add --out
   - add --target language 
- add ng app deployed on github pages

## Inspiration
- https://github.com/Himenon/openapi-typescript-code-generator
- https://ts-ast-viewer.com/

- https://hiphip.app/?s=09
- https://jsonapi.org/examples/?s=09
- https://github.com/bcherny/json-schema-to-typescript?s=09
- https://indepth.dev/posts/1442/ngrx-bad-practices?s=09
- https://twitter.com/stack_tracy_/status/1370983902718791683?s=09
- https://dev-academy.com/angular-user-login-and-registration-guide-cookies-and-jwt/?utm_source=twitter&s=09
- https://www.jayfreestone.com/writing/bulletproof-flag/
- https://github.com/kapunahelewong/module-injector-tree/blob/master/src/app/lazy/lazy.module.ts

## Contributing

Please help if you find some interest.

## Examples
```yaml
- fieldStr1 : value1
  fieldInt2 : 123
  fieldList3 :
    - item1 : 1
    - item2 : 2
  fieldList4 :
    - 1
    - 2
  fieldList5 :
    - '1'
    - '2'
- fieldStr1 : value12
  fieldList4 :
    - 21
    - 22
```
```typescript
 export interface test_yaml {
  /**
   * @example "value1"
   * @example "value12"
   */
  fieldStr1  : string;
  /**
   * @example 123
   */
  fieldInt2 ?: number;
  /**
   * @example [{"item1":1},{"item2":2}]
   */
  fieldList3 ?: unknown[];
  /**
   * @example [1,2]
   * @example [21,22]
   */
  fieldList4  : number[];
  /**
   * @example ["1","2"]
   */
  fieldList5 ?: string[];
}
```


## License
Copyright (c) 2021 Carlos.<br>
Licensed under the [MIT](https://opensource.org/licenses/MIT) License.
