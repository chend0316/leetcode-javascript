/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  let res = [];
  function backtrace(qs, yused, xydiff, xyadd) {
    if (qs.length === n) {
      res.push([...qs]);
      return;
    }
    let x = qs.length;
    for (let y = 0; y < n; y++) {
      if (yused.has(y) || xydiff.has(x - y) || xyadd.has(x + y)) {
        continue;
      }
      qs.push(y);
      yused.add(y);
      xydiff.add(x - y);
      xyadd.add(x + y);
      backtrace(qs, yused, xydiff, xyadd);
      qs.pop();
      yused.delete(y);
      xydiff.delete(x - y);
      xyadd.delete(x + y);
    }
  }

  backtrace([], new Set(), new Set(), new Set());

  return res.map((board) => board.map((position) => {
    let strBuilder = [];
    for (let i = 0 ; i < n; i++) {
      if (i === position) strBuilder.push('Q');
      else strBuilder.push('.');
    }
    return strBuilder.join('');
  }));
};

module.exports = solveNQueens;
