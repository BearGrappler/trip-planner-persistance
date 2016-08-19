var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');
var Day = require('./day')

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, {as: 'DayIDA' ,through: 'DayRestaurant'});
Day.belongsToMany(Activity, {as : 'DayIDB' ,through: 'DayActivity'});

module.exports = db;
