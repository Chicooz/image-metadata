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
    endian = endian || 'big';
    var value = (endian === 'big')
              ? this.buffer.readUInt16BE(this.offset)
              : this.buffer.readUInt16LE(this.offset);
    this.offset += 2;
    return value;
  },

  nextSignedShort: function (endian) {
    endian = endian || 'big';
    var value = (endian === 'big')
              ? this.buffer.readInt16BE(this.offset)
              : this.buffer.readInt16LE(this.offset);
    this.offset += 2;
    return value;
  },

  nextLong: function (endian) {
    endian = endian || 'big';
    var value = (endian === 'big')
              ? this.buffer.readUInt32BE(this.offset)
              : this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return value;
  },

  nextSignedLong: function (endian) {
    endian = endian || 'big';
    var value = (endian === 'big')
              ? this.buffer.readInt32BE(this.offset)
              : this.buffer.readInt32LE(this.offset);
    this.offset += 4;
    return value;
  }

}

module.exports = MarkerReader;