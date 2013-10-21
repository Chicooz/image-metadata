'use strict';

var debug = process.env['IMAGE_METADATA_DEBUG'] ? true : false;

var colors = require('colors');

var BufferWrapper = require('./buffer-wrapper');
var JpegMarkers = require('./markers/jpeg');

module.exports = {

  isValid: function (buffer) {
    // Must be a buffer && Start of Image must be 0xffd8
    if (!Buffer.isBuffer(buffer) || buffer.readUInt16BE(0) !== JpegMarkers.SOI)
      return false;
    return true;
  },

  getInfos: function (buffer, next) {

    if(!this.isValid(buffer)) {
      next(new Error("Not a valid JPEG"), null);
      return;
    }

    var data = {},
        stream = new BufferWrapper(buffer),
        marker = stream.nextUShort();

    while(marker !== JpegMarkers.SOS && marker !== JpegMarkers.EOI && marker !== false) {

      marker = stream.nextUShort();

      if(debug && marker === JpegMarkers.SOS)
        console.info('SOS matched'.cyan, marker, stream.offset);
      if(debug && marker === JpegMarkers.EOI)
        console.info('EOI matched'.cyan, marker, stream.offset);

    }

    next(null, data);
  }

};