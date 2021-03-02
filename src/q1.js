/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const expect = new Map();
  for (var i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (expect.has(num)) {
      return [i, expect.get(num)];
    }
    expect.set(target - num, i);
  }
  return [];
};

module.exports = twoSum;
