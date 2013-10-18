var expect = require('chai').expect;

var BufferWrapper = require('../lib/buffer-wrapper');

describe('BufferWrapper', function() {

  describe('constructor', function() {

    it('throw error if given buffer is not a Buffer', function() {
      var fn = function () { new BufferWrapper(false); };
      expect(fn).to.throw('Invalid Buffer');
    });

    it('throw error if given buffer a Buffer', function() {
      var fn = function () { new BufferWrapper(new Buffer(8)); };
      expect(fn).to.not.throw('Invalid Buffer');
    });

    it('define start and end', function () {
      var reader = new BufferWrapper(new Buffer(8));
      expect(reader).to.have.property('offset', 0);
      expect(reader).to.have.property('end', reader.length);
    });

  });

  describe('#nextUByte()', function () {
    it('return next unsigned byte', function () {

      var buf = new Buffer(2);
      buf.writeUInt16BE(0xfeed, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextUByte()).to.equal(0xfe);
      expect(reader.nextUByte()).to.equal(0xed);
    });
  });

  describe('#nextByte()', function () {
    it('return next signed byte', function () {
      var buf = new Buffer(2);
      buf.writeInt8(-2, 0);
      buf.writeInt8(2, 1);
      var reader = new BufferWrapper(buf);

      expect(reader.nextByte()).to.equal(-2);
      expect(reader.nextByte()).to.equal(2);
    });
  });

  describe('#nextUShort()', function () {
    it('return next unsigned short in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xfeedface, 0);
      var reader = new BufferWrapper(buf);
      reader.setBigEndianness(true);

      expect(reader.nextUShort()).to.equal(0xfeed);
      expect(reader.nextUShort()).to.equal(0xface);
    });

    it('return next unsigned short in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xedfecefa, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextUShort()).to.equal(0xfeed);
      expect(reader.nextUShort()).to.equal(0xface);
    });
  });

  describe('#nextShort()', function () {
    it('return next signed short in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      reader = new BufferWrapper(buf);
      reader.setBigEndianness(true);

      expect(reader.nextShort()).to.equal(0x424d);
      expect(reader.nextShort()).to.equal(0x313d);
    });
    it('return next signed short in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextShort()).to.equal(0x4d42);
      expect(reader.nextShort()).to.equal(0x3d31);
    });
  });

  describe('#nextULong()', function () {
    it('return next unsigned long in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xfeedface, 0);
      var reader = new BufferWrapper(buf);
      reader.setBigEndianness(true);

      expect(reader.nextULong()).to.equal(0xfeedface);
    });

    it('return next unsigned long in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xfeedface, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextULong()).to.equal(0xcefaedfe);
    });
  });

  describe('#nextLong()', function () {
    it('return next signed long in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      var reader = new BufferWrapper(buf);
      reader.setBigEndianness(true);

      expect(reader.nextLong()).to.equal(0x424d313d);
    });
    it('return next signed long in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextLong()).to.equal(0x3d314d42);
    });
  });

});