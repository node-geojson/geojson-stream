var expect = require('expect.js'),
    fs = require('fs'),
    concat = require('concat-stream'),
    geojsonStream = require('../');

describe('geojson-stream', function() {
    describe('read', function() {
        it('accepts a stream', function(done) {
            var s = geojsonStream.parse();
            fs.createReadStream('test/data/featurecollection.geojson')
                .pipe(s).pipe(concat(function(d) {
                    expect(d).to.eql(JSON.parse(fs.readFileSync('test/data/featurecollection.result')));
                    done();
                }));
        });
    });

    describe('write', function() {
        it('writes a geojson document', function(done) {
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
                expect(JSON.parse(str)).to.eql({
                    type: 'FeatureCollection',
                    features: [pt]
                });
                done();
            }
        });
    });
});
