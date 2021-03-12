const path = require('path');
const glob = require('glob');
const metaData = require('./metadata.json');
const utils = require('./utils');

glob.sync('q*.js', { cwd: path.resolve(__dirname, '../src') })
.map(filename => path.join(__dirname, '../src', filename))
.forEach((filename) => {
  let func = require(filename);
  const id = filename.match(/q(\d+)\.js/)[1];
  if (id == null) throw new Error('error');
  const paramCount = metaData[id].params.length;  // 这题需要的参数个数
  if (!Reflect.has(metaData[id], 'exampleResult')) {
    // 测试用例没有预期结果数据
    test.skip(`q${id}`, () => { });
    return;
  }
  const exampleResults = metaData[id].exampleResult.split('\n');
  const testcases = metaData[id].exampleTestcases.split('\n').map((v, i) => {
    return utils.parse(metaData[id].params[i % paramCount].type, v);
  });
  if (testcases.length % paramCount !== 0) throw new Error('error');
  describe(`q${id}`, () => {
    let args = [];
    for (let i = 0; i < testcases.length;) {
      args.push(testcases[i]);
      i++;
      if (i % paramCount == 0) {
        const ret = func.apply(null, args);
        let result;
        const returnType = metaData[id].return.type;
        if (Reflect.has(metaData[id], 'output')) {
          const outputMeta = metaData[id].output;
          const paramIndex = outputMeta.paramIndex;
          if (Reflect.has(outputMeta, 'size')) {
            let outputSize;
            if (outputMeta.size === 'ret') outputSize = ret;
            else throw new Error('error');
            result = utils.stringify(metaData[i].params[paramIndex].type, args[paramIndex].slice(0, outputSize));
          } else {
            result = utils.stringify(metaData[id].params[paramIndex].type, args[paramIndex]);
          }
        } else {
          result = utils.stringify(returnType, ret);
        }
        args = [];
        test(`case${i / paramCount}`, () => {
          expect(result).toBe(exampleResults[i / paramCount - 1]);
        });
      }
    }
  });
});
