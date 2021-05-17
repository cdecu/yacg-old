# Yacg scaffolding

- This project was generated using [Nx](https://nx.dev).
```
npx create-nx-workspace yacg         
mv workspace.json angular.json
edit nx.json to replace workspace.json angular.json
npm add @nrwl/node
```

- Use nx console to generate libs and apps 
```
nx generate @nrwl/node:library --name=core --buildable --importPath=@yacg/core --linter=eslint --publishable --strict "--tags=code generator" --testEnvironment=jsdom --unitTestRunner=jest --no-interactive --dry-run 
nx generate @nrwl/node:application --name=json2code --linter=eslint --tags=json2code --unitTestRunner=jest --dry-run 
nx generate @nrwl/angular:application --name=ngYacg --style=scss --e2eTestRunner=cypress --enableIvy --linter=eslint --prefix=yacg --strict --tags=angular --unitTestRunner=jest --viewEncapsulation=Emulated --no-interactive --dry-run 
```

- #nrwl/node 
To use node 16.xx+ `yarn config set ignore-engines true`
Add custom webpack plugin ShebangPlugin, to keep `#!/usr/bin/env node` shebang.  
This requires webpack 5 :(
  
- Start coding

