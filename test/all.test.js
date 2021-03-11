const metaData = require('../scrapy/metadata.json');
const testData = require('./testdata.json');

// todo: 有些题目不是判断返回值的，而是就地修改入参
testData.forEach(({id, testCases, metaData}) => {
  const filename = '../src/q' + id + '.js';
  delete module.require.cache[filename];
  var foo = require(filename);
  describe('q' + id, () => {
    testCases.forEach((testCase, testCaseIdx) => {
      var params = [];
      for (var i = 0; i < testCase.params.length; i++) {
        params.push(convertValue(metaData.params[i], testCase.params[i]));
      }
      var result = convertValue(metaData.return, testCase.return);
      test('case' + testCaseIdx, () => {
        expectResult(metaData.return, foo.apply(undefined, params), result);
      });
    });
  });
});

function convertValue(metaData, data) {
  switch (metaData.type) {
    case 'integer':
      return data.value;
    case 'integer[]':
      return data.value;
    // todo:
  }
}

function expectResult(metaData, a, b) {
  switch (metaData.type) {
    case 'integer':
      expect(a).toBe(b);
    case 'integer[]':
      a.sort();
      b.sort();
      expect(a).toStrictEqual(b);
    // todo:
  }
}