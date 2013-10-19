module.exports = {

  SOI:      0xffd8, // Start of Image
  SOS:      0xffda,
  EOI:      0xffd9, // End of Image
  APP0:     0xffe0,
  APP1:     0xffe1,
  APP13:    0xffed,
  COM:      0xfffe,

  // Start of Frame markers, nondifferential Huffman-coding frames
  SOF0:     0xffc0, // baseline DCT
  SOF1:     0xffc1, // Extended sequential DCT, Huffman coding
  SOF2:     0xffc2, // Progressive DCT, Huffman coding
  SOF3:     0xffc3, // Lossless sequential, Huffman coding

  // Start of Frame markers, differential Huffman-coding frames
  SOF5:     0xffc5, // Differential sequential DCT, Huffman coding
  SOF6:     0xffc6, // Differential progressive DCT, Huffman coding
  SOF7:     0xffc7, // Differential lossless, Huffman coding

  // Start of Frame markers, nondifferential arithmetic-coding frames
  SOF9:     0xffc9, // Extended sequential DCT, arithmetic coding
  SOF10:    0xffca, // Progressive DCT, arithmetic coding
  SOF11:    0xffcb, // Lossless sequential, arithmetic coding

  // Start of Frame markers, differential arithmetic-coding frames
  SOF13:    0xffcd, // Differential sequential DCT, arithmetic coding
  SOF14:    0xffce, // Progressive DCT, arithmetic coding
  SOF15:    0xffcf, // Differential lossless, arithmetic coding

  exifId:   'Exif\0\0',
  jfifId:   'JFIF\0',
  xmpId:    'http://ns.adobe.com/xap/1.0/\0',
  iptc:     0x0404,
  preview:  0x040c

};