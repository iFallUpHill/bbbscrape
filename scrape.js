var request = require('request');
var cheerio = require('cheerio');
var argv = require('yargs').argv;
var mobDict = require('./json/Mob.json');
var eqpDict = require('./json/Eqp.json');
var consumeDict = require('./json/Consume.json');
var etcDict = require('./json/Etc.json');

var pepeScrollsDict = {
  '2043021': '2043001',
  '2043116': '2043101',
  '2043216': '2043201',
  '2044024': '2044001',
  '2044116': '2044101',
  '2044216': '2044201',
  '2044316': '2044301',
  '2044416': '2044401',
  '2043811': '2043801',
  '2043711': '2043701',
  '2044511': '2044501',
  '2044611': '2044601',
  '2044711': '2044701',
  '2043311': '2043301',
  '2044816': '2044801',
  '2044909': '2044901'
}

// Mushroom Kingdom
// var mobLookup = [
// "http://bbb.hidden-street.net/monster/renegade-spores",
// "http://bbb.hidden-street.net/monster/poison-mushroom",
// "http://bbb.hidden-street.net/monster/intoxicated-pig",
// "http://bbb.hidden-street.net/monster/helmet-pepe",
// "http://bbb.hidden-street.net/monster/royal-guard-pepe",
// "http://bbb.hidden-street.net/monster/gold-yeti-and-king-pepe",
// "http://bbb.hidden-street.net/monster/grey-yeti-and-king-pepe",
// "http://bbb.hidden-street.net/monster/white-yeti-and-king-pepe",
// "http://bbb.hidden-street.net/monster/prime-minister",
// ]

// Kerning City Square
// var mobLookup = [
// "http://bbb.hidden-street.net/monster/cherry-bubble-tea",
// "http://bbb.hidden-street.net/monster/mango-bubble-tea",
// "http://bbb.hidden-street.net/monster/melon-bubble-tea",
// "http://bbb.hidden-street.net/monster/yeti-doll-claw-game",
// "http://bbb.hidden-street.net/monster/yeti-doll",
// "http://bbb.hidden-street.net/monster/jr-pepe-doll-claw-game",
// "http://bbb.hidden-street.net/monster/jr-pepe-doll",
// "http://bbb.hidden-street.net/monster/transformed-doll-claw-game",
// "http://bbb.hidden-street.net/monster/transformed-doll-claw-game-2",
// "http://bbb.hidden-street.net/monster/kid-mannequin",
// "http://bbb.hidden-street.net/monster/female-mannequin",
// "http://bbb.hidden-street.net/monster/male-mannequin",
// "http://bbb.hidden-street.net/monster/blue-perfume",
// "http://bbb.hidden-street.net/monster/blue-perfume-2",
// "http://bbb.hidden-street.net/monster/yellow-perfume",
// "http://bbb.hidden-street.net/monster/yellow-perfume-2",
// "http://bbb.hidden-street.net/monster/pink-perfume",
// "http://bbb.hidden-street.net/monster/pink-perfume-2",
// "http://bbb.hidden-street.net/monster/latest-hits-compilation",
// "http://bbb.hidden-street.net/monster/greatest-oldies",
// "http://bbb.hidden-street.net/monster/cheap-amplifier",
// "http://bbb.hidden-street.net/monster/fancy-amplifier",
// "http://bbb.hidden-street.net/monster/cheap-amplifier-vip",
// "http://bbb.hidden-street.net/monster/greatest-oldies-vip",
// "http://bbb.hidden-street.net/monster/cheap-amplifier-vip",
// "http://bbb.hidden-street.net/monster/fancy-amplifier-vip",
// "http://bbb.hidden-street.net/monster/spirit-of-rock"
// ]

// Chryse
// var mobLookup = [
// "http://global.hidden-street.net/monster/rabbit",
// "http://global.hidden-street.net/monster/golden-rabbit",
// "http://global.hidden-street.net/monster/ergoth",
// "http://global.hidden-street.net/monster/scorpie",
// "http://global.hidden-street.net/monster/golden-scorpie",
// "http://global.hidden-street.net/monster/ferret",
// "http://global.hidden-street.net/monster/golden-ferret",
// "http://global.hidden-street.net/monster/mammoth",
// "http://global.hidden-street.net/monster/golden-mammoth",
// "http://global.hidden-street.net/monster/xerxes",
// ]

// Neo City 
// var mobLookup = [
// "http://bbb.hidden-street.net/monster/red-slime-2",
// "http://bbb.hidden-street.net/monster/silver-slime",
// "http://bbb.hidden-street.net/monster/gold-slime",
// "http://bbb.hidden-street.net/monster/overlord-a",
// "http://bbb.hidden-street.net/monster/overlord-b",
// "http://bbb.hidden-street.net/monster/bergamot",
// "http://bbb.hidden-street.net/monster/robby",
// "http://bbb.hidden-street.net/monster/iruvata",
// "http://bbb.hidden-street.net/monster/dunas",
// "http://bbb.hidden-street.net/monster/afterlord",
// "http://bbb.hidden-street.net/monster/prototype-lord",
// "http://bbb.hidden-street.net/monster/aufheben",
// "http://bbb.hidden-street.net/monster/maverick-type-a",
// "http://bbb.hidden-street.net/monster/maverick-type-s",
// "http://bbb.hidden-street.net/monster/maverick-type-d",
// "http://bbb.hidden-street.net/monster/oberon",
// "http://bbb.hidden-street.net/monster/imperial-guard",
// "http://bbb.hidden-street.net/monster/royal-guard",
// "http://bbb.hidden-street.net/monster/gatekeeper-nex",
// ]

// Showa
var mobLookup = [
"http://bbb.hidden-street.net/monster/jr-cerebes",
"http://bbb.hidden-street.net/monster/bain",
"http://bbb.hidden-street.net/monster/male-boss",
"http://bbb.hidden-street.net/monster/female-boss",
"http://bbb.hidden-street.net/monster/the-boss",
"http://bbb.hidden-street.net/monster/extra-a",
"http://bbb.hidden-street.net/monster/extra-b",
"http://bbb.hidden-street.net/monster/extra-c",
"http://bbb.hidden-street.net/monster/extra-d",
"http://bbb.hidden-street.net/monster/bodyguard-a",
"http://bbb.hidden-street.net/monster/bodyguard-b",
"http://bbb.hidden-street.net/monster/leader-a",
"http://bbb.hidden-street.net/monster/leader-b",
]

var queries = argv.queries ? true : false;
var requestURLs = argv.url ? [argv.url] : mobLookup;

// Config Droprates
var equipDropRate = 70;
var useDropRate = 100
var scrollDropRate = 20;
var starDropRate = 100;
var arrowDropRate = 8000;
var elixirDropRate = 1000;
var potionDropRate = 10000;
var etcDropRate = 400000;
var makerDropRate = 300;
var oreDropRate = 2500;

// Arrow Drops
var arrowMin = 11;
var arrowMax = 17;

var toID = function(arr, category, mobID='00000000', dropRate = 0) {
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

      if (currentID) {
        leadingDigits = currentID.substring(0,3);
      }

      // Exclude Kataras (Temp for Neo City.)
      if (leadingDigits !== '134') { 
        if (arr[i] === '-' || currentID === undefined) {
          console.log('Cannot find ID for: ', arr[i].trim());
        } else {
          if (queries) {
            console.log("INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('" + mobID+ "', '" + currentID + "', '1', '1', '0', '" + dropRate + "');");
          } else {
            idList.push(currentID);
          }
        }
      }
    }
  }

  else if (category === 'consume') {
    for (var i = 0; i < arr.length; i++) {
      var currentID = consumeDict[arr[i].trim()];
      var modifiedDropRate = dropRate;
      var minimum_quantity = 1;
      var maximum_quantity = 1;
      var leadingDigits = '0';
      if (currentID) {
        leadingDigits = currentID.substring(0,3);
      }

      // Checks for elixir/power elixir, scrolls, potions, stars, arrows
      if (currentID === '2000004 ' || currentID == '2000005 ') {
        modifiedDropRate = elixirDropRate;
      } else if (leadingDigits === '204') {
        modifiedDropRate = scrollDropRate;
      } else if (leadingDigits === '200' || leadingDigits === '203' || leadingDigits === '202') {
        modifiedDropRate = potionDropRate;
      } else if (leadingDigits === '207') {
        modifiedDropRate = starDropRate;
      } else if (leadingDigits === '206') {
        modifiedDropRate = arrowDropRate;
        minimum_quantity = arrowMin;
        maximum_quantity = arrowMax;
      }
      if (arr[i] === '-' || currentID === undefined) {
        console.log('Cannot find ID for: ', arr[i].trim());
      } else {

        // Remove King Pepe Scrolls
        if (pepeScrollsDict[currentID]) {
          currentID = pepeScrollsDict[currentID];
        }

        if (queries) {
          console.log("INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('" + mobID+ "', '" + currentID + "', '" + minimum_quantity + "', '" + maximum_quantity + "', '0', '" + modifiedDropRate + "');");
        } else {
          idList.push(currentID);
        }
      }
    }
  }

  else if (category === 'etc') {
    for (var i = 0; i < arr.length; i++) {
      var currentID = etcDict[arr[i].trim()];
      if (arr[i] === '-' || currentID === undefined) {
        console.log('Cannot find ID for: ', arr[i].trim());
      } else {
        if (queries) {
          console.log("INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('" + mobID+ "', '" + currentID + "', '1', '1', '0', '" + dropRate + "');");
        } else {
          idList.push(currentID);
        }
      }
    }
  }

  return idList;
}

for (var i = 0; i < requestURLs.length; i++) {
  request(requestURLs[i], function (error, response, html) {
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
        var mobID = toID(mobName, 'mob')[0];
        if (queries) {
          toID(etc, 'etc', mobID, etcDropRate);
          toID(ore, 'etc', mobID, oreDropRate);
          toID(maker, 'etc', mobID, makerDropRate);
          toID(useable, 'consume', mobID, useDropRate);
          toID(common, 'eqp', mobID, equipDropRate);
          toID(warrior, 'eqp', mobID, equipDropRate);
          toID(magician, 'eqp', mobID, equipDropRate);
          toID(bowman, 'eqp', mobID, equipDropRate);
          toID(thief, 'eqp', mobID, equipDropRate);
          console.log('----------------------------------------')
        } else {
          console.log(toID(etc, 'etc', mobID, etcDropRate));
          console.log(toID(ore, 'etc', mobID, oreDropRate));
          console.log(toID(maker, 'etc', mobID, makerDropRate));
          console.log(toID(useable, 'consume', mobID, useDropRate));
          console.log(toID(common, 'eqp', mobID, equipDropRate));
          console.log(toID(warrior, 'eqp', mobID, equipDropRate));
          console.log(toID(magician, 'eqp', mobID, equipDropRate));
          console.log(toID(bowman, 'eqp', mobID, equipDropRate));
          console.log(toID(thief, 'eqp', mobID, equipDropRate));
        }
      });
    } else {
      console.log("Request Failed for: ", requestURLs[i])
    }
  });
}


