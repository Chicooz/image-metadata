var expect = require('chai').expect;

var MarkerReader = require('..').MarkerReader;

var reader;

describe('MarkerReader', function() {

  describe('constructor', function() {

    it('throw error if given buffer is not a Buffer', function() {
      var fn = function () { new MarkerReader(false); };
      expect(fn).to.throw('Invalid Buffer');
    });

    it('throw error if given buffer a Buffer', function() {
      var fn = function () { new MarkerReader(new Buffer(8)); };
      expect(fn).to.not.throw('Invalid Buffer');
    });

    it('define start and end', function () {
      var reader = new MarkerReader(new Buffer(8));
      expect(reader).to.have.property('offset', 0);
      expect(reader).to.have.property('end', reader.length);
    });

  });

  describe('#nextByte()', function () {
    it('return next unsigned byte', function () {

      var buf = new Buffer(2);
      buf.writeUInt16BE(0xfeed, 0);
      reader = new MarkerReader(buf);

      expect(reader.nextByte()).to.equal(0xfe);
      expect(reader.nextByte()).to.equal(0xed);
    });
  });

  describe('#nextSignedByte()', function () {
    it('return next signed byte', function () {
      var buf = new Buffer(2);
      buf.writeInt8(-2, 0);
      buf.writeInt8(2, 1);
      reader = new MarkerReader(buf);

      expect(reader.nextSignedByte()).to.equal(-2);
      expect(reader.nextSignedByte()).to.equal(2);
    });
  });


});