const path = require('path');
const glob = require('glob');
const metaData = require('../scrapy/metadata.json');
const testData = require('./testdata.json');
const snapShot = {};
const utils = require('./utils');

const mode = 'snapshot';
// const mode = 'judge'

glob.sync('q*.js', { cwd: path.resolve(__dirname, '../src') })
.map(filename => path.join(__dirname, '../src', filename))
.forEach((filename) => {
  console.log(filename);
  // delete module.require.cache[filename];
  let func = require(filename);
  const id = filename.match(/q(\d+)\.js/)[1];
  if (id == null) {
    throw new Error('error');
  }
  snapShot[id] = [];
  const paramCount = metaData[id].params.length;  // 这题需要的参数个数
  const inputs = [];
  const testcases = metaData[id].exampleTestcases.split('\n');
  // assert: testcases.length % paramCount === 0
  for (let i = 0; i < testcases.length;) {
    let tmp = [];
    while (tmp.length < paramCount) {
      tmp.push(testcases[i]);
      i++;
    }
    inputs.push(tmp.join('\n'));
  }
  for (let i = 0; i < inputs.length; i++) {
    const args = [];
    inputs[i].split('\n').forEach((param, j) => {
      const paramType = metaData[id].params[j].type;
      if (utils.converter[paramType] == null) throw new Error(`${paramType} unsupport`);
      args.push(utils.converter[paramType].parse(param));
    });
    if (mode === 'snapshot') {
      const returnType = metaData[id].return.type;
      const result = func.apply(null, args);
      if (utils.converter[returnType] == null) throw new Error(`${returnType} unsupport`);
      snapShot[id].push({
        input: inputs[i],
        output: utils.converter[returnType].stringify(result)
      });
    }
  }
});
utils.saveSnapshot(JSON.stringify(snapShot, undefined, '  '));
