'use strict';

var fs = require('fs');

var JpegParser = require('../lib/jpeg');

fs.readFile(__dirname + "/images/5204090031_11501c86ae_o.jpg", function (err, buffer) {
  if(err) console.err(err);

  JpegParser.getInfos(buffer, function (err, data) {
    if(err) throw err;

    console.log(data);
  });

});