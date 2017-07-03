var request = require('request');
var cheerio = require('cheerio');
var argv = require('yargs').argv;
var mobDict = require('./json/Mob.json');
var eqpDict = require('./json/Eqp.json');
var consumeDict = require('./json/Consume.json');
var etcDict = require('./json/Etc.json');

var toID = function(arr, category) {
  //console.log(arr)
  idList = []

  if (category === 'mob') {
    for (var i = 0; i < arr.length; i++) {
      var currentID = mobDict[arr[i].trim()];
      if (arr[i] === '-' || currentID === undefined) {
        console.log('Cannot find ID for: ', arr[i].trim());
      } else {
        idList.push(currentID);
      }
    }
  }

  else if (category === 'eqp') {
    for (var i = 0; i < arr.length; i++) {
      var currentID = eqpDict[arr[i].trim()];
      if (arr[i] === '-' || currentID === undefined) {
        console.log('Cannot find ID for: ', arr[i].trim());
      } else {
        idList.push(currentID);
      }
    }
  }

  else if (category === 'consume') {
    for (var i = 0; i < arr.length; i++) {
      var currentID = consumeDict[arr[i].trim()];
      if (arr[i] === '-' || currentID === undefined) {
        console.log('Cannot find ID for: ', arr[i].trim());
      } else {
        idList.push(currentID);
      }
    }
  }

  else if (category === 'etc') {
    for (var i = 0; i < arr.length; i++) {
      var currentID = etcDict[arr[i].trim()];
      if (arr[i] === '-' || currentID === undefined) {
        console.log('Cannot find ID for: ', arr[i].trim());
      } else {
        idList.push(currentID);
      }
    }
  }

  return idList;
}

request(argv.url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var mobName = $('#page-title').text().trim().split(',');
    $('table.monster').each(function(i, element){
      var etc = $('td:contains("Etc. drop:")').text().replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,'').replace(/Etc. drop: /g,'').trim().split(',');
      var ore = $('td:contains("Ore drop:")').text().replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,'').replace(/Ore drop: /g,'').trim().split(',');
      var maker = $('td:contains("Maker item:")').text().replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,'').replace(/Maker item: /g,'').trim().split(',');
      var useable = $('td:contains("Useable drop:")').text().replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,'').replace(/Useable drop: /g,'').trim().split(',');

      var common = $('strong:contains("Common equipment:")').parent().text().replace(/(\r\n|\n|\r| \(M\)| \(F\))/gm,"").replace(/ +(?= )/g,'').replace(/Common equipment: /g,'').trim().split(',');
      var warrior = $('strong:contains("Warrior equipment:")').parent().text().replace(/(\r\n|\n|\r| \(M\)| \(F\))/gm,"").replace(/ +(?= )/g,'').replace(/Warrior equipment: /g,'').trim().split(',');
      var magician = $('strong:contains("Magician equipment:")').parent().text().replace(/(\r\n|\n|\r| \(M\)| \(F\))/gm,"").replace(/ +(?= )/g,'').replace(/Magician equipment: /g,'').trim().split(',');
      var bowman = $('strong:contains("Bowman equipment:")').parent().text().replace(/(\r\n|\n|\r| \(M\)| \(F\))/gm,"").replace(/ +(?= )/g,'').replace(/Bowman equipment: /g,'').trim().split(',');
      var thief = $('strong:contains("Thief equipment:")').parent().text().replace(/(\r\n|\n|\r| \(M\)| \(F\))/gm,"").replace(/ +(?= )/g,'').replace(/Thief equipment: /g,'').trim().split(',');

      console.log('Mob: ', toID(mobName, 'mob'));
      console.log(toID(etc, 'etc'));
      console.log(toID(ore, 'etc'));
      console.log(toID(maker, 'etc'));
      console.log(toID(useable, 'consume'));
      console.log(toID(common, 'eqp'));
      console.log(toID(warrior, 'eqp'));
      console.log(toID(magician, 'eqp'));
      console.log(toID(bowman, 'eqp'));
      console.log(toID(thief, 'eqp'));
    });
  }
});
