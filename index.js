var JSONStream = require('JSONStream');

var openPre = '{"type":"FeatureCollection"',
    propsPre = ',"properties":'
    openPost = ',"features":[',
    open = openPre + openPost
    close = ']}';

module.exports.parse = function() {
    var jsonstream = JSONStream.parse('features.*');
    return jsonstream;
};

module.exports.stringify = function(properties) {
    var start = properties ?
      (openPre + propsPre + JSON.stringify(properties) + openPost) :
      open;
    var jsonstream = JSONStream.stringify(start, '\n,\n', close);
    return jsonstream;
};
