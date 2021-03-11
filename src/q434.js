const _ = require('lodash');

var countSegments = function(s) {
  return _.compact(s.split(/\s+/)).length;
};

module.exports = countSegments;
