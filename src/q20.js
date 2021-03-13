/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const map = {
    ')': '(',
    ']': '[',
    '}': '{'
  };
  const stack = ['#'];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if ('([{'.includes(c)) {
      stack.push(c);
    } else if (stack.pop() !== map[c]) {
      return false;
    }
  }
  return stack.length === 1;
};

module.exports = isValid;