/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  var res = [];
  function backtrace(l, r, path) {
    if (l === 0 && r === 0) res.push(path);
    if (l > r) return;
    if (l > 0) backtrace(l - 1, r, path + '(');
    if (r > 0 && r > l) backtrace(l, r - 1, path + ')');
  }
  backtrace(n, n, '');
  return res;
};

module.exports = generateParenthesis;
