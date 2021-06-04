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

- Deploy
  https://github.com/AhsanAyaz/angular-deploy-gh-pages-actions  
  https://github.com/angular-schule/angular-cli-ghpages  
  https://efficientuser.com/2021/03/04/how-to-deploy-angular-app-on-github-pages-for-free/   


- GitHub Actions
``` 
name: Deploy to GitHub Pages
on: [push]
jobs:
  Deploy-Ng-Yacg:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2.1.5
        with:
          node-version: '14'
      - name: Install
        run: yarn install
      - name: Nrwl Nx
        uses: MansaGroup/nrwl-nx-action@v2.1.0
        with:
          targets: build
          projects: ng-yacg
      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.3
        with:
          branch: gh-pages
          folder: build
          clean: true
          single-commit: true
          silent: true
      - run: echo "🍏 This job's status is ${{ job.status }}."
```
