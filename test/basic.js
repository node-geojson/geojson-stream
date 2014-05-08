var test = require('tap').test,
    fs = require('fs'),
    concat = require('concat-stream'),
    geojsonStream = require('../');

test('geojson-stream: read', function(t) {
    var s = geojsonStream.parse();
    fs.createReadStream(__dirname + '/data/featurecollection.geojson')
        .pipe(s).pipe(concat(function(d) {
            t.deepEqual(d, JSON.parse(fs.readFileSync(__dirname + '/data/featurecollection.result')));
            t.end();
        }));
});

test('geojson-stream: write', function(t) {
    var pt = {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [0, 0]
        },
        properties: {}
    };

    var s = geojsonStream.stringify();
    s.pipe(concat(finish));
    s.write(pt);
    s.end();

    function finish(str) {
        t.deepEqual(JSON.parse(str), {
            type: 'FeatureCollection',
            features: [pt]
        });
        t.end();
    }
});
