module.exports = BufferWrapper;

function BufferWrapper (buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error('Invalid Buffer');

  this.buffer = buffer;
  this.offset = 0;
  this.end = buffer.length;
  this.endianness = 'LE';
}

BufferWrapper.prototype = {

  setBigEndianness: function (flag) {
    this.endianness = !!flag ? 'BE' : 'LE';
  },

  nextUByte: function () {
    return this.buffer.readUInt8(this.offset ++);
  },

  nextByte:  function () {
    return this.buffer.readInt8(this.offset ++);
  },

  nextUShort: function () {
    return readBytes(this, 2, 'U');
  },

  nextShort: function () {
    return readBytes(this, 2);
  },

  nextULong: function () {
    return readBytes(this, 4, 'U');
  },

  nextLong: function () {
    return readBytes(this, 4);
  }

}

function readBytes(BufferWrapper, bytes, signFlag) {
  // Build buffer reader method name (ex. readUInt16BE)
  var method = ['read', signFlag || '', 'Int', bytes * 8, BufferWrapper.endianness].join('');
  // Increment offset for next call
  BufferWrapper.offset += bytes;

  return BufferWrapper.buffer[method](BufferWrapper.offset - bytes);
}