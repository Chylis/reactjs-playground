This app
- transpiles via Babel
- bundling via Webpack
- linging via ESLint
- tests via Mocha
- serving the app via Express
- ties everything together via npm Scripts


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
