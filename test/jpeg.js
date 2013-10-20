/*global describe:true,it:true */
'use strict';

var libpath = process.env['IMAGE_METADATA_COV'] ? '../lib-cov' : '../lib';

var fs = require('fs');

var expect = require('chai').expect;

var JpegParser = require(libpath + '/jpeg');
var BufferWrapper = require(libpath + '/buffer-wrapper');

describe('JpegParser', function() {

  describe('constructor', function() {

    it('throw error if given buffer is not a Buffer', function() {
      var fn = function () { return new JpegParser(false); };
      expect(fn).to.Throw('Invalid Buffer');
    });

    it('not throw error if given buffer a Buffer', function() {
      var reader;
      var buf = new Buffer(8);
      var bufWrapper = new BufferWrapper(buf);
      var fn = function () { reader = new JpegParser(buf); };
      expect(fn).to.not.Throw('Invalid Buffer');
      expect(reader.buffer).to.deep.equal(bufWrapper);
    });

  });

  describe('#isValid()', function () {


    it('return false if buffer is PNG content', function (done) {

      fs.readFile(__dirname + '/images/valid-png.png', function (err, buffer) {
        if(err) throw err;
        var parser = new JpegParser(buffer);
        expect(parser.isValid()).to.equal(false);
        done();
      });

    });

    it('return false if buffer is fake file', function (done) {

      fs.readFile(__dirname + '/images/fake-jpeg.jpg', function (err, buffer) {
        if(err) throw err;
        var parser = new JpegParser(buffer);
        expect(parser.isValid()).to.equal(false);
        done();
      });

    });

    it('return true if buffer is jpeg content', function (done) {

      fs.readFile(__dirname + '/images/valid-jpeg.jpg', function (err, buffer) {
        if(err) throw err;
        var parser = new JpegParser(buffer);
        expect(parser.isValid()).to.equal(true);
        done();
      });

    });

  });

});