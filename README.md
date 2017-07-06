# BBB HiddenStreet Scraper

Generates a list of mob item drops based an input URL from http://bbb.hidden-street.net

How to Use:
```
git clone https://github.com/iFallUpHill/bbbscrape.git
npm install
node scraper --url="<bbb.hidden-street url here>" 
```

Optional parameter: ```--queries```

Example:
```
node scrape --url="http://bbb.hidden-street.net/monster/platoon-chronos" 

Mob:  [ '2600611' ]
[ '4000115', '4031992', '4130015', '4130009' ]
[ '4020007', '4004000' ]
[ '4007000', '4007006' ]
[ '2000002', '2000003', '2001525', '2040804', '2049301', '2382049' ]
[ '1092030' ]
[ '1312008', '1060074', '1402007', '1432004', '1040085', '1092013' ]
[ '1382012', '1072116', '1002143', '1050036', '1092029' ]
[ '1040076', '1060065' ]
Cannot find ID for:  Blue Burgler
[ '1082074', '1002176', '1002178' ]
```

```
node scrape --url="http://bbb.hidden-street.net/monster/platoon-chronos" --queries 

Mob:  [ '2600611' ]
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '4000115', '1', '1', '0', '250');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '4031992', '1', '1', '0', '250');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '4130015', '1', '1', '0', '250');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '4130009', '1', '1', '0', '250');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '4020007', '1', '1', '0', '75');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '4004000', '1', '1', '0', '75');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '4007000', '1', '1', '0', '40');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '4007006', '1', '1', '0', '40');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '2000002', '1', '1', '0', '80');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '2000003', '1', '1', '0', '80');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '2001525', '1', '1', '0', '80');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '2040804', '1', '1', '0', '20');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '2049301', '1', '1', '0', '20');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '2382049', '1', '1', '0', '80');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1092030', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1312008', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1060074', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1402007', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1432004', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1040085', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1092013', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1382012', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1072116', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1002143', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1050036', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1092029', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1040076', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1060065', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1082074', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1002176', '1', '1', '0', '100');
INSERT into drop_data (dropperid, itemid, minimum_quantity, maximum_quantity, questid, chance) VALUES ('2600611', '1002178', '1', '1', '0', '100');
Cannot find ID for:  Blue Burgler
```

## Updating ID List

Place text files containing the item IDs in the 'txt' folder. The text file should be formatted as follows:

```Item ID - Item Name``` ➜ ```1002357 - Zakum Helmet```


Run: ```node txt_to_json``` to generate the new JSON files containing the item IDs.

## Known Issues
* Unless the item name on BBB exactly matches the item name provided in the text file, the scraper will fail to locate the item and will notify you in the console output.
* As there are some items with the same name but multiple IDs, the first instance of the item in the list of item IDs will be used. This was done for simplicity as well as due to the fact that there is a higher chance of the desired item having an older item ID.



