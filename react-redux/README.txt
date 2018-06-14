This app
- transpiles via Babel
- bundling via Webpack
- linting via ESLint
- tests via Mocha
- serving the app via Express
- ties everything together via npm Scripts


ABOUT

FLOW:
1) npm open:src (in package.json) will run babel-node, with tools/srcServer.js as input
2) srcServer.js starts a server that serves incoming with "src/index.html"
3) index.html:
  3.1) contains a <div> element with id "app" within the DOM
  3.2) will also execute the javascript contained within bundle.js (bundle.js was outputted by webpack, see webpack.config.js)
4) bundle.js contains our src/index.js file, which is executed when index.html is loaded
5) index.js:
  5.1) builds a router component, passing in our App.js as the topmost component (and injects the other components as child components) as props
  5.2) finds the DOM-element with id "app" (see step 3.1) and renders the App component within it


COMPONENTS:

Component naming:
- use the "Page" suffix to signify top level components/container components. e.g. HomePage, AboutPage, etc.


React router:
- The router is responsible for mapping paths/routes to a component, e.g. "/" --> "HomePage", "/about" --> "AboutPage", etc
- It passes in child components as properties (in props) into components.
- It is wired up in src/routes.js


RUNNING:

The custom npm commands are defined in package.json, under the "scripts" section.

1) Develop
1.1) npm start
Runs the "preStart", "open:src" and "lint:watch" and "test:watch" scripts in parallel (by calling "npm-run-all --parallel open:src lint:watch")


2) Run code only
1.1 npm open:src
It compiles tools/srcServer.js with babel-node because we used ES6 inside our srcServer.js file


3) Lint only
3.1 npm run lint (see package.json, under scripts section).
Will run ESLint-watch (a wrapper around ESLint) that provides file watching functionality

3.2 npm run lint:want (see package.json, under scripts section).
Will run ESLint-watch with the '--watch' flag
It now watches the files, so when you save a file lint will run and notify you if you break any rules.

4) Test
4.1 npm test
Will tell mocha to run testSetup.js and then run any tests that it finds in the src directory

4.2) npm test:watch
Will watch the files, and when we save a file run the tests







Q's
- When/where does webpack execute/create the bundle?
