/*global describe:true,it:true */
'use strict';

var libpath = process.env['IMAGE_METADATA_COV'] ? '../lib-cov' : '../lib';
var expect = require('chai').expect;

var BufferWrapper = require(libpath + '/buffer-wrapper');

describe('BufferWrapper', function() {

  describe('constructor', function() {

    it('throw error if given buffer is not a Buffer', function() {
      var fn = function () { return new BufferWrapper(false); };
      expect(fn).to.Throw('Invalid Buffer');
    });

    it('not throw error if given buffer a Buffer', function() {
      var reader;
      var buf = new Buffer(8);
      var fn = function () { reader = new BufferWrapper(buf); };
      expect(fn).to.not.Throw('Invalid Buffer');
      expect(reader.buffer).to.equal(buf);
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

    it('return false if no bytes to read', function () {
      var buf = new Buffer(1);
      buf.writeUInt8(0xfe, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextUByte()).to.equal(0xfe);
      expect(reader.nextUByte()).to.equal(false);
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

    it('return false if no bytes to read', function () {
      var buf = new Buffer(1);
      buf.writeUInt8(0x00, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextByte()).to.equal(0x00);
      expect(reader.nextByte()).to.equal(false);
    });
  });

  describe('#nextUShort()', function () {
    it('return next unsigned short in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xfeedface, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextUShort()).to.equal(0xfeed);
      expect(reader.nextUShort()).to.equal(0xface);
    });

    it('return next unsigned short in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xedfecefa, 0);
      var reader = new BufferWrapper(buf);
      reader.setBigEndianness(false);

      expect(reader.nextUShort()).to.equal(0xfeed);
      expect(reader.nextUShort()).to.equal(0xface);
    });

    it('return false if not enough bytes to read', function () {
      var buf = new Buffer(3);
      buf.writeUInt16BE(0xfeed, 0);
      buf.writeUInt8(0xfa, 2);
      var reader = new BufferWrapper(buf);

      expect(reader.nextUShort()).to.equal(0xfeed);
      expect(reader.nextUShort()).to.equal(false);
    });
  });

  describe('#nextShort()', function () {
    it('return next signed short in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextShort()).to.equal(0x424d);
      expect(reader.nextShort()).to.equal(0x313d);
    });

    it('return next signed short in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      var reader = new BufferWrapper(buf);
      reader.setBigEndianness(false);

      expect(reader.nextShort()).to.equal(0x4d42);
      expect(reader.nextShort()).to.equal(0x3d31);
    });

    it('return false if not enough bytes to read', function () {
      var buf = new Buffer(3);
      buf.writeUInt16BE(0x0101, 0);
      buf.writeUInt8(0x02, 2);
      var reader = new BufferWrapper(buf);

      expect(reader.nextShort()).to.equal(0x0101);
      expect(reader.nextShort()).to.equal(false);
    });
  });

  describe('#nextULong()', function () {
    it('return next unsigned long in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xfeedface, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextULong()).to.equal(0xfeedface);
    });

    it('return next unsigned long in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeUInt32BE(0xfeedface, 0);
      var reader = new BufferWrapper(buf);
      reader.setBigEndianness(false);

      expect(reader.nextULong()).to.equal(0xcefaedfe);
    });

    it('return false if not enough bytes to read', function () {
      var buf = new Buffer(6);
      buf.writeUInt32BE(0xfeedface, 0);
      buf.writeUInt16BE(0xdeed, 4);
      var reader = new BufferWrapper(buf);

      expect(reader.nextULong()).to.equal(0xfeedface);
      expect(reader.nextULong()).to.equal(false);
    });
  });

  describe('#nextLong()', function () {
    it('return next signed long in big endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      var reader = new BufferWrapper(buf);

      expect(reader.nextLong()).to.equal(0x424d313d);
    });

    it('return next signed long in low endian format', function () {

      var buf = new Buffer(4);
      buf.writeInt32BE(0x424d313d, 0);
      var reader = new BufferWrapper(buf);
      reader.setBigEndianness(false);

      expect(reader.nextLong()).to.equal(0x3d314d42);
    });

    it('return false if not enough bytes to read', function () {
      var buf = new Buffer(6);
      buf.writeUInt32BE(0x424d313d, 0);
      buf.writeUInt16BE(0x2020, 4);
      var reader = new BufferWrapper(buf);

      expect(reader.nextLong()).to.equal(0x424d313d);
      expect(reader.nextLong()).to.equal(false);
    });
  });

});