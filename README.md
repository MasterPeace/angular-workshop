# Angular Workshop
Zero to Hero Setup and Workshop

## Setup
Install
1. Download and Install Nodejs https://nodejs.org/en/
1. Download and Install Yarn https://yarnpkg.com/en/
1. Use Yarn to do a global installation of Angular CLI: `yarn global add @angular/cli`
1. Confirm Angular CLI is working: `ng v`

## 1 - Initalize Project
1. `ng new angular-tour-of-heroes --commit=false  --inline-style  --prefix=th --routing  --skip-git --skipTests  --style=scss`
1. Add Material: `ng add @angular/material` 
    * choose `custom` for theme
    * choose `HammerJS` if you wish to support mobile 
    * choose `yes` to support ripple and slide animations 
1. Add Lodash: `yarn add lodash-es`
1. Add Lodash Typescript definitions: `yarn add --dev @types/lodash-es`
1. Add Bootstrap: `yarn add --dev bootstrap`
    * do not add jquery or popper.js as we are not using the bootstrap components; just layout
1. Add prettier: `yarn add --dev prettier`

## 2 - Eric's Favorite Tweaks
1. Update Linting rules to flag and automatically remove unused imports. Add: `"no-unused-variable": true` to the `tslint.json` file inside the "rules" property 
1. Add prettier to package.json script commands: `"prettier": "prettier --single-quote --tab-width 2 --print-width 80 --write \"src/app/**/*.ts\""`
1. Tie the lint rules and prettier together in package.json:
    * `"lint-fix": "ng lint --fix true --type-check true",`
    * `"prettier": "prettier --single-quote --tab-width 2 --print-width 80 --write \"src/app/**/*.ts\""`
    * `"format": "yarn run prettier && yarn run lint-fix",`
1. Try your new linter: `yarn format`