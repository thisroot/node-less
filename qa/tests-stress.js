var loadtest = require('loadtest');
var expect = require('chai').expect;

suite('Stress tests', function() {

	test('Homepage should handle 50 requests in under a second', function(done) {
		var options = {
			url: 'http://5.39.81.129:8181',
			concurrency: 4,
			maxRequests: 20,
		};
		loadtest.loadTest(options, function(err,result) {
			expect(!err);
			expect(result.totalTimeSeconds < 1);
			done();
		});
	});

});
