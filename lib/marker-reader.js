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

  nextSignedByte:  function() {
    return this.buffer.readInt8(this.offset ++);
  }

}

module.exports = MarkerReader;