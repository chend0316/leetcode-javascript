/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  let res = 0;
  function backtrace(qs, yused, xydiff, xyadd) {
    if (qs.length === n) {
      res++;
      return;
    }
    let x = qs.length;
    for (let y = 0; y < n; y++) {
      if (yused.has(y) || xydiff.has(x - y) || xyadd.has(x + y)) {
        continue;
      }
      backtrace(
        qs.concat([y]),
        new Set(yused).add(y),
        new Set(xydiff).add(x - y),
        new Set(xyadd).add(x + y)
      );
    }
  }
  backtrace([], new Set(), new Set(), new Set());
  return res;
};
