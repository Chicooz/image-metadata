function MarkerReader (buffer) {

  if (!Buffer.isBuffer(buffer)) throw new Error('Invalid Buffer');

  this.buffer = buffer;
  this.start = 0;
  this.end = buffer.length;
};

module.exports = MarkerReader;