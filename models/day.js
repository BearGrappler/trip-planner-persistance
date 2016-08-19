var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
  number: Sequelize.INTEGER
},{
    classMethods: {

    },

    instanceMethods: {
        setThing: function(typeOfAttraction, attractionName) {
            if(typeOfAttraction === 'restaurant'){
                this.addDayIDA(attractionName);
            }
            else if(typeOfAttraction === 'activity'){
                this.addDayIDB(attractionName);
            }
        }
    }
});

module.exports = Day;
