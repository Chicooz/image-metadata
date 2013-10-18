function MarkerReader (buffer) {

  if (!Buffer.isBuffer(buffer)) throw new Error('Invalid Buffer');

  this.buffer = buffer;
  this.offset = 0;
  this.end = buffer.length;

};

MarkerReader.prototype = {

  nextByte: function () {
    return this.buffer.readUInt8(this.offset ++);
  },

  nextSignedByte:  function () {
    return this.buffer.readInt8(this.offset ++);
  },

  nextShort: function (endian) {
    return this.nextMultiBytes(16, endian);
  },

  nextSignedShort: function (endian) {
    return this.nextMultiBytes(16, endian, true);
  },

  nextLong: function (endian) {
    return this.nextMultiBytes(32, endian);
  },

  nextSignedLong: function (endian) {
    return this.nextMultiBytes(32, endian, true);
  },

  nextMultiBytes: function(bytes, endian, isSigned) {

    var method, signed, value;

    endian = bytes <= 8 ? '' : endian === 'low' ? 'LE' : 'BE';
    signed = isSigned ? '' : 'U';

    method = 'read' + signed + 'Int' + bytes + endian;
    value = this.buffer[method](this.offset);
    this.offset += (bytes / 8);

    return value;
  }

};

module.exports = MarkerReader;