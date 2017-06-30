const assert = require('assert');
const acorn = require('../index');
const fs = require('fs');
const path = require('path');

function parse(code) {
  const options = {
    ecmaVersion: 7,
    locations: true,
    plugins: {objectRestSpread: true}
  };

  return acorn.parse(code, options);
}

function assertAst(code, expectedAst) {
  const ast = parse(code);
  assert.deepEqual(ast.body, [expectedAst]);
}

// test fixtures are adapted from babylon
describe('acorn-object-rest-spread plugin', function() {
  const testPath = './test/data';
  const testFiles = fs.readdirSync(testPath);

  const testCases = Object.keys(testFiles.reduce((memo, tf) => {
    const ext = path.extname(tf);
    const name = tf.substr(0, tf.length - ext.length);
    memo[name] = true;
    return memo;
  }, {}));

  it('should load all test cases', function() {
    assert.equal(testCases.length, 5);
  });

  function readTestData(name, ext) {
    return fs.readFileSync(path.join(testPath, name + ext), 'utf8');
  }

  testCases.forEach(tc => {
    it(`should support ${tc}`, function() {
      const code = readTestData(tc, '.js');
      const ast = JSON.parse(readTestData(tc, '.json'));
      assertAst(code, ast);
    });
  });
});
