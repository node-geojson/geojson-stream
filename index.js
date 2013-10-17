var JSONStream = require('JSONStream');

var open = '{"type":"FeatureCollection","features":[',
    close = ']}';

module.exports.parse = function() {
    var jsonstream = JSONStream.parse('features.*');
    return jsonstream;
};

module.exports.stringify = function() {
    var jsonstream = JSONStream.stringify(open, '\n,\n', close);
    return jsonstream;
};
