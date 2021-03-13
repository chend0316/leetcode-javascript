/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  const res = [];
  nums = [...nums];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    let j = i + 1;
    let k = nums.length - 1;
    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum === 0) res.push([nums[i], nums[j], nums[k]]);
      if (sum <= 0) {
        while (++j < k && nums[j] === nums[j - 1]) {
          // noop
        }
      }
      if (sum >= 0) {
        while (--k > j && nums[k] === nums[k + 1]) {
          // noop
        }
      }
    }
  }
  return res;
};

module.exports = threeSum;
