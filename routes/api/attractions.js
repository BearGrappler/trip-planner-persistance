var router = require('express').Router();
var db = require('../../models/_db.js');
var Hotel = require('../../models/hotel.js');
var Restaurant = require('../../models/restaurant.js');
var Activity = require('../../models/activity.js');
var Day = require('../../models/day.js')

router.get('/api/day/:number', function(req, res){
    var numberOfDay = req.params.number;

    day.findOne({where: {number: numberOfDay}})
    .then(function(dayInformation){
        res.send(dayInformation);
    })
})

router.get('/api/:attraction', function(req, res){
    var attraction = req.params.attraction;

    if(attraction === 'hotels'){
        Hotel.findAll()
        .then(function(hotels){
            res.send(hotels);
        })
    }
    else if(attraction === 'restaurants'){
        Restaurant.findAll()
        .then(function(restaurants){
            res.send(restaurants);
        })
    }
    else if(attraction === 'activities'){
        Activity.findAll()
        .then(function(activities){
            res.send(activities);
        })
    }
    else {
        res.send('Not found');
    }


} )


module.exports = router;
