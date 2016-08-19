var router = require('express').Router();
var db = require('../../models/_db.js');
var Hotel = require('../../models/hotel.js');
var Restaurant = require('../../models/restaurant.js');
var Activity = require('../../models/activity.js');
var Day = require('../../models/day.js')


router.post('/api/day/:number/:attraction', function(req, res){
    var attraction = req.params.attraction,
    numberOfDay = parseInt(req.params.number);

    var day;
    var therestaurant;
    console.log(req.body)
    console.log(typeof req.body)


    //need to add condition functionality
    Day.findOne( {where:{number: numberOfDay }})
    .then(function(foundDay){
        return foundDay.setThing(req.params.attraction, req.body.id);
    })
    .then(function(json) {
        res.json(json);
    })

    //find day
    //find restaurant
    //update restaurant as "Belonging to" the day


    // if(attraction === 'hotels'){
    //     Hotel.findAll()
    //     .then(function(hotels){
    //         res.send(hotels);
    //     })
    // }
    // else if(attraction === 'restaurants'){
    //     Restaurant.findAll()
    //     .then(function(restaurants){
    //         res.send(restaurants);
    //     })
    // }
    // else if(attraction === 'activities'){
    //     Activity.findAll()
    //     .then(function(activities){
    //         res.send(activities);
    //     })
    // }
    // else {
    //     res.send('Not found');
    // }


} )


router.get('/api/day/:number', function(req, res){
    var numberOfDay = req.params.number;

    Day.findOne({where: {number: numberOfDay},
                include: {model: Restaurant}})
    .then(function(dayInformation){
        res.send(dayInformation);
    })
})

router.post('/api/day/:number', function(req, res){
    var numberOfDay = req.params.number;

    Day.create({number: numberOfDay})
    //use junction methods to create associations between
    //restaurants and activities
    res.send('you hit here')
})


router.put('/api/day/:number', function(req, res){
    var numberOfDay = req.params.number;


})

router.delete('/api/day/:number', function(req, res){
    var numberOfDay = req.params.number;
    Day.destroy({where: {number: numberOfDay}})
    .then(function(){
       res.send('destroyed');
    })
    .catch(function(err){
        throw err;
    })

})

router.get('/api/day', function(req, res){
    Day.findAll()
    .then(function(days){
        res.send(days)
    })
    .catch(function(err){
        throw err;
    })
})

module.exports = router;
