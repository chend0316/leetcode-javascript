const {ListNode } = require('../src/leetcode');

module.exports.stringify = function (type, val) {
  if (type === 'string') {
    return `"${val}"`;
  } else if (type === 'boolean') {
    return val === true ? 'true' : 'false';
  } else if (type === 'integer') {
    return `${val}`;
  } else if (type === 'integer[]') {
    return `[${val.join(',')}]`;
  } else if (type.match(/list<(.+)>/)) {
    return `[${val.map(e => this.stringify(type.match(/list<(.+)>/)[1], e)).join(',')}]`;
  } else if (type === 'ListNode') {
    let ret = [];
    let p = val;
    while (p) {
      ret.push(`${p.val}`);
      p = p.next;
    }
    return `[${ret.join(',')}]`;
  }
  throw new Error(`${type} 暂不支持`);
};

module.exports.parse = function (type, str) {
  if (type === 'string') {
    return str.substring(1, str.length - 1);
  } else if (type === 'boolean') {
    return str === 'true';
  } else if (type === 'integer') {
    return Number.parseInt(str);
  } else if (type === 'integer[]') {
    if (str === '[]') return [];
    return str.substring(1, str.length - 1).split(',').map((s) => Number.parseInt(s));
  } else if (type.match(/list<(.+)>/)) {
    if (str == '[]') return [];
    return str.substring(1, str.length - 1).split(',').map(s => this.parseParam(type.match(/list<(.+)>/)[1], s));
  } else if (type === 'ListNode') {
    if (str === '[]') return null;
    const dummy = new ListNode();
    let p = dummy;
    str.substring(1, str.length - 1).split(',').forEach(s => {
      p.next = new ListNode(parseInt(s));
      p = p.next;
    });
    return dummy.next;
  }

  throw new Error(`${type} 暂不支持`);
};