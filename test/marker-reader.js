var expect = require('chai').expect;

var MarkerReader = require('../lib/marker-reader');

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

  describe('#nextShort()', function () {
    it('return next unsigned short in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xfeedface, 0);
      reader = new MarkerReader(buf);

      expect(reader.nextShort()).to.equal(0xfeed);
      expect(reader.nextShort()).to.equal(0xface);
    });

    it('return next unsigned short in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xedfecefa, 0);
      reader = new MarkerReader(buf);

      expect(reader.nextShort('low')).to.equal(0xfeed);
      expect(reader.nextShort('low')).to.equal(0xface);
    });
  });

  describe('#nextSignedShort()', function () {
    it('return next signed short in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      reader = new MarkerReader(buf);

      expect(reader.nextSignedShort()).to.equal(0x424d);
      expect(reader.nextSignedShort()).to.equal(0x313d);
    });
    it('return next signed short in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      reader = new MarkerReader(buf);

      expect(reader.nextSignedShort('low')).to.equal(0x4d42);
      expect(reader.nextSignedShort('low')).to.equal(0x3d31);
    });
  });

  describe('#nextLong()', function () {
    it('return next unsigned long in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xfeedface, 0);
      reader = new MarkerReader(buf);

      expect(reader.nextLong()).to.equal(0xfeedface);
    });

    it('return next unsigned long in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xfeedface, 0);
      reader = new MarkerReader(buf);

      expect(reader.nextLong('low')).to.equal(0xcefaedfe);
    });
  });

  describe('#nextSignedLong()', function () {
    it('return next signed long in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      reader = new MarkerReader(buf);

      expect(reader.nextSignedLong()).to.equal(0x424d313d);
    });
    it('return next signed long in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      reader = new MarkerReader(buf);

      expect(reader.nextSignedLong('low')).to.equal(0x3d314d42);
    });
  });

});