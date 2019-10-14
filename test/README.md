# Testing Suite
This project uses Mocha to orchestrate tests and Instanbul to calculate testing coverage. Right now we plan to use the standard NPM assertion library for writing tests, but that is subject to change.

# Running Tests
To just run the testing suite, run
```sh
npm run-script test
```

To run the tests and get a code coverage report, run
```sh
npm run-script test-coverage
```

# Writing Tests
Locate or create a file under `test` in the appropriate, mirrored subfolder and name it something related to what you plan to test. For example, if I need to write tests for the Toolbar, I would put them in `test/components/Toolbar/TestToolbar.js`.

All the tests need to require in the Mithril-Query library.
```javascript
var mq = require("mithril-query");
```

Also require in any of the components you will be testing. IE, for testing the toolbar I would put
```javascript
var Toolbar = require("../../../../js/views/components/Toolbar/Toolbar");
```

Next we write in the Mocha "framework" to structure our tests and also format the output. This is all done with `describe( text, function(){})` and `it( text, function(){})`. The text variables are just labels that get printed out to the console during test execution. These should describe what you're testing. The `describe()` functions are just for grouping tests, the `it()` functions are where tests actually go. The tests should be assertions from the [Mithril-Query API](https://github.com/MithrilJS/mithril-query) or the built in [NodeJS Assertion Library](https://nodejs.org/api/assert.html). Here is an example that checks to make sure the Toolbar has atleast one `<i>` element in it.

```javascript
describe("Toolbar", function(){

    var tbNode = mq(Toolbar);

    it("should have icons in it", function(){

        tbNode.should.have.at.least(1, "i");

    });
});
```

