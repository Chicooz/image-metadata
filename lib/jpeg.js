'use strict';

var BufferWrapper = require('./buffer-wrapper');
var JpegMarkers = require('./markers/jpeg');

module.exports = JpegParser;

function JpegParser (buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error('Invalid Buffer');

  this.buffer = new BufferWrapper(buffer);
}

JpegParser.prototype = {

  isValid: function () {
    // Start of Image must be 0xffd8
    return this.buffer.nextUShort() === JpegMarkers.SOI;
  }

};