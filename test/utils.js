module.exports.stringify = function (type, val) {
  if (type === 'string') {
    return `"${val}"`;
  } else if (type === 'integer') {
    return `${val}`;
  } else if (type === 'integer[]') {
    return `[${val.join(',')}]`;
  } else if (type.match(/list<(.+)>/)) {
    return `[${val.map(e => this.stringify(type.match(/list<(.+)>/)[1], e)).join(',')}]`;
  }
  throw new Error(`${type} 暂不支持`);
};

module.exports.parse = function (type, str) {
  if (type === 'string') {
    return str.substring(1, str.length - 1);
  } else if (type === 'integer') {
    return Number.parseInt(str);
  } else if (type === 'integer[]') {
    if (str === '[]') return [];
    return str.substring(1, str.length - 1).split(',').map((s) => Number.parseInt(s));
  } else if (type.match(/list<(.+)>/)) {
    if (str == '[]') return [];
    return str.substring(1, str.length - 1).split(',').map(s => this.parseParam(type.match(/list<(.+)>/)[1], s));
  }

  throw new Error(`${type} 暂不支持`);
};