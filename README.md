# Angular Workshop
Zero to Hero Setup and Workshop

## Setup
Install
1. Download and Install Nodejs https://nodejs.org/en/
1. Download and Install Yarn https://yarnpkg.com/en/
1. Use Yarn to do a global installation of Angular CLI: `yarn global add @angular/cli`
1. Confirm Angular CLI is working: `ng v`

## 1 - Initalize Project
1. Configure Angular CLI to use Yarn: `ng config --global cli.packageManager yarn`
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
### Update Angular CLI to Always Use Yarn For Your Project
1. Inside the angular-tour-of-heroes workspace: `ng config  cli.packageManager yarn`
### Automatic Linting and Code Standards
1. Update Linting rules to flag and automatically remove unused imports. Add: `"no-unused-variable": true` to the `tslint.json` file inside the "rules" property 
1. Add prettier to package.json script commands: `"prettier": "prettier --single-quote --tab-width 2 --print-width 80 --write \"src/app/**/*.ts\""`
1. Tie the lint rules and prettier together in package.json:
    * `"lint-fix": "ng lint --fix true --type-check true",`
    * `"prettier": "prettier --single-quote --tab-width 2 --print-width 80 --write \"src/app/**/*.ts\""`
    * `"format": "yarn run prettier && yarn run lint-fix",`
1. Try your new linter: `yarn format`

### Add Bootstrap SCSS
We are going to make use a subset of bootstrap features. To do this we are going to only import the portions of their SCSS that we want
Override default bootstrap settings and make it easier to do so in the future
1. create folder "`src/styles`"
1. add a file "`src/styles/bootstrap-variables.scss`"
1. add the following lines:
    * $link-color: rgb(63, 81, 181); // your mat-primary value hard-coded
    * $link-hover-color: currentColor;
    * $link-hover-decoration: none;

In `styles.css`:
1. add bootstrap override variables: `@import 'styles/bootstrap-variables';`
1. add the bootstrap utilities, grid, and table (optional) classes:
    * `@import '~bootstrap/scss/bootstrap-reboot';`
    * `@import '~bootstrap/scss/bootstrap-grid';`
    * `@import "~bootstrap/scss/utilities";`
    * `@import "~bootstrap/scss/tables";`
1. some bootstrap styles interfere with material. copy styles-reset.scss from the git repo in "`src/styles/`" into yours and then add in your styles.scss: `@import 'styles/styles-reset';`

### Add Common Folder
As your project grows you will have more reusable code. To avoid having to do long relative imports of your most common pieces you can import them with short paths
1. Create a folder that you want to place various reusable pieces: `src/app/common`
1. Update your tsconfig.json with the knowledge of that path after `"baseUrl"`:
```javascript
    "paths": {
      "@env/*": ["environments/*"],
      "common/*": ["src/app/common/*"]
    }
```
    * these paths are relative to `baseUrl`
    * you can add as many of these as you'd like
    * you can be more specific or rename these
    * when you specify `*` it means that sub-folders are directly accessiable
    * if you don't specify `*` then only things that exposed via `index.ts` exports will be importable using the short url
1. now for every sub-folder or  module you put in `common` you should create an `index.ts` file that exports those pieces. We'll come back to this later

## 3 - Create Your Landing Pages
1. Clear all the junk out of `app.component.html` except for `<router-outlet></router-outlet>`
1. (Optional) Create a folder called `pages` to put all of the components that will directly represent routing paths 
    * I like this as it creates a nice separation from the top of your app that tends to get cluttered with things you want running across the whole site, like user tracking, from everything else. I also prefer deeper folder nesting over larger flat structures. This is also the pattern that Ionic loosely follows. 
1. `cd` into your directory (`src\app\pages`) and create your first module to hold your new page: `ng g m landing-page --routing`
    * ng - Angular CLI
    * g - generate
    * m - module
    * --routing - create a lazy loading router module
1. create a component: `ng g c landing-page`
1. Add the landing page to the routes file: `{ path: '', component: LandingPageComponent}`
1. Add the new lazy-loading module and routes to app-routing.module.ts: `{path: '', loadChildren: () => import('./pages/landing-page/landing-page.module').then(mod => mod.LandingPageModule)}`
1. Add some flair, add a nav-bar. For a quick an easy one use https://material.angular.io/components/toolbar/overview 

### Sample Common Folder Usage - Add Loading Spinner
Let's create a loading spinner
1. In your terminal, navigate to the common directory and start by creating a module to hold our loading spinner: `ng g m loading-spinner`
    * ng - Angular CLI
    * g - generate
    * m - module
1. add a loading-spinner component: `ng g c loading-spinner`
    * ng - Angular CLI
    * g - generate
    * c - component (component is added to the "nearest" module file)
1. lookup the Mat Progress Bar from https://material.angular.io to find instructions on how to specify an indefintie loading spinner
    * don't forget to add the progress bar module to the loading-spinner module
    * Add the spinner to the dom
    * Add an ngIf around it
    * Add a loading boolean as @Input to control the spinner
1. Add the loading-spinner component to the module's export
1. Add an index.ts file to the loading-spinner folder
1. Add: `export * from './loading-spinner.module';` to the index.ts file 

## 4 - Load Data From NASA

1. Get yourself an API Key: https://api.nasa.gov/index.html
1. add the HttpClient to constructor imports
1. make get call using absolute full URL to: `https://api.nasa.gov/planetary/apod?api_key=<your-api-key>`

### Let's Pretend that NASA is your backend and the api_key is your user's JWT Token
Abstract the http call into custom service so that you do not have to always add the API Key to every call
1. Create `services` folder under `common`
1. create a `base-http` service: `ng g s base-http`
    * ng - angular cli
    * g - generate
    * s - service
1. Inject the HTTP Client into the service
1. Wrap "all" calls that we might make, in this case just "get" with a function: `public get(url: string, params?: HttpParams): Observable<any> { ...`
1. Add a stub authentication function: `private getAuthorization(): string`
1. inside the `get` function check to see if params were passed in and then add to, or create params, that receive `params = params.set('api_key', this.getAuthorization())`
1. return the actual observable `return this.httpClient.get(url, params);` 

### Taking it further - let's proxy to your backend like a real service
Normally you don't want to hardcode your server's URL in the UI code. While there are multiple ways to handle this the two best options are:
1. don't
1. use envrionment.ts
For this demo we will go with the first option and create a proxy file.
1. create a proxy file at the root of the project: `proxy.conf.json`
1. redirect all calls to "planetary" to your REST server (NASA):
```
{
  "/rest" : {
      "target": "https://api.nasa.gov",
      "secure": false
  }
}

```
1. finally create a new run command that makes use of the proxy and add that to your package.json: `"start:proxy": "ng serve --proxy-config proxy.conf.json",`
1. run your new command: `yarn start:proxy`
    * don't forget to remove the base of the url from  your http get call (`https://api.nasa.gov`)

## Additional exploration options

* Add error handling using `rxjs/operators`, specifically: `catchError`
* Add loading spinner logic during fetch from nasa using pipe operators such as `tap`
 * Add a delay to the loading so the spinner stays up longer by using pipe-able operators such as `delay`
* Subscribe directly in the dom using `async` pipe
* create sub-lazy loading routes
