const fs = require('fs');
const path = require('path');

module.exports.saveSnapshot = function (snapshot) {
  fs.writeFileSync(path.join(__dirname, 'snapshot.json'), snapshot);
};

module.exports.converter = {
  'string': {
    parse: (str) => str.substring(1, str.length - 1),
    stringify: (value) => `"${value}"`
  },
  'integer': {
    parse: (str) => Number.parseInt(str),
    stringify: (value) => `${value}`
  },
  'integer[]': {
    parse: (str) => str.substring(1, str.length - 1).split(',').map((s) => Number.parseInt(s)),
    stringify: (value) => '[' + value.join(',') + ']'
  },
  'list<string>': {
    parse: (str) => str.substring(1, str.length - 1).split(',').map(s => s.substring(1, s.length - 1)),
    stringify: (value) => '[' + value.map(v => `"${v}"`).join(',') + ']'
  }
};
