var expect = require('chai').expect;

var MarkerReader = require('..').MarkerReader;

describe('MarkerReader', function() {

  describe('constructor', function(){

    it('should throw error if given buffer is not a Buffer', function() {
      var fn = function () { new MarkerReader(false); };
      expect(fn).to.throw('Invalid Buffer');
    });

    it('should throw error if given buffer a Buffer', function() {
      var fn = function () { new MarkerReader(new Buffer(8)); };
      expect(fn).to.not.throw('Invalid Buffer');
    });

    it('should define start and end', function () {
      var reader = new MarkerReader(new Buffer(8));
      expect(reader).to.have.property('start', 0);
      expect(reader).to.have.property('end', reader.length);
    });

  });

});