/*global describe:true,it:true */
'use strict';

var libpath = process.env['IMAGE_METADATA_COV'] ? '../lib-cov' : '../lib';

var fs = require('fs');

var expect = require('chai').expect;

var JpegParser = require(libpath + '/jpeg');
var BufferWrapper = require(libpath + '/buffer-wrapper');

describe('JpegParser', function() {

  describe('#isValid()', function () {

    it('return false if buffer is PNG content', function (done) {

      fs.readFile(__dirname + '/images/valid-png.png', function (err, buffer) {
        if(err) throw err;
        expect(JpegParser.isValid(buffer)).to.equal(false);
        done();
      });

    });

    it('return false if buffer is fake file', function (done) {

      fs.readFile(__dirname + '/images/fake-jpeg.jpg', function (err, buffer) {
        if(err) throw err;
        expect(JpegParser.isValid(buffer)).to.equal(false);
        done();
      });

    });

    it('return true if buffer is jpeg content', function (done) {

      fs.readFile(__dirname + '/images/valid-jpeg.jpg', function (err, buffer) {
        if(err) throw err;
        expect(JpegParser.isValid(buffer)).to.equal(true);
        done();
      });

    });

  });

  describe('#getInfos', function () {

    it('return Error if something is wrong', function (done) {

      fs.readFile(__dirname + '/images/fake-jpeg.jpg', function (err, buffer) {
        if(err) throw err;
        JpegParser.getInfos(buffer, function (err, data) {
          expect(data).to.be.null;
          expect(err).to.be.an.instanceof(Error);
          done();
        });
      });

    });

    it('return data object if everything is fine', function (done) {

      fs.readFile(__dirname + '/images/valid-jpeg.jpg', function (err, buffer) {
        if(err) throw err;
        JpegParser.getInfos(buffer, function (err, data) {
          expect(data).to.be.an.instanceof(Object);
          expect(err).to.be.null;
          done();
        });
      });

    });

  });

});