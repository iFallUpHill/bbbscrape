var fs = require('fs');
var readline = require('readline');

var lineReader = readline.createInterface({
  input: fs.createReadStream('txt/Mob.txt')
});

var makeJson = function(filein, fileOut) {
	var lineReader = readline.createInterface({
	  input: fs.createReadStream(filein)
	});

	var dict = {};

	lineReader.on('line', function (line) {
	  var entry = line.split(' - ');
	  if (dict[entry[1]] === undefined ) {
	  	dict[entry[1]] = entry[0];
	  }
	});

	lineReader.on('close', function() {
		//console.log(dict);
		fs.writeFile(fileOut, JSON.stringify(dict, null, 2), { flag : 'w' }, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + fileOut);
        }
    });
	});
}

makeJson('txt/Mob.txt', 'json/Mob.json');
makeJson('txt/Eqp.txt', 'json/Eqp.json');
makeJson('txt/Consume.txt', 'json/Consume.json');
makeJson('txt/Etc.txt', 'json/Etc.json');

