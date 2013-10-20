'use strict';

module.exports = BufferWrapper;

function BufferWrapper (buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error('Invalid Buffer');

  this.buffer = buffer;
  this.offset = 0;
  this.end = buffer.length;
  this.endianness = 'BE';
}

BufferWrapper.prototype = {

  setBigEndianness: function (flag) {
    this.endianness = !!flag ? 'BE' : 'LE';
  },

  nextUByte: function () {
    return readBytes(this, 1, 'U');
  },

  nextByte:  function () {
    return readBytes(this, 1);
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

};

function readBytes(BufferWrapper, bytes, signFlag) {
  if(bytes + BufferWrapper.offset > BufferWrapper.end)
    return false;

  // Build buffer reader method name (ex. readUInt8)
  var method = ['read', signFlag || '', 'Int', bytes * 8];
  // Add endianness if needed (ex. readUInt16BE)
  if(bytes > 1)
    method.push(BufferWrapper.endianness);
  // Increment offset for next call
  BufferWrapper.offset += bytes;

  return BufferWrapper.buffer[method.join('')](BufferWrapper.offset - bytes);
}