'use strict';

var JpegMarkers = require('./markers/jpeg');

module.exports = JpegParser;

function JpegParser (buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error('Invalid Buffer');

  this.buffer = buffer;
}

JpegParser.prototype = {

  isValid: function () {
    // Start of Image must be 0xffd8
    return this.buffer.readUInt16BE(0) === JpegMarkers.SOI;
  }

};