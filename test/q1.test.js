const twoSum = require('../src/q1')

test('q1', () => {
  const res = twoSum([2,7,11,15], 9)
  res.sort()
  expect(res).toStrictEqual([0,1]);
});
