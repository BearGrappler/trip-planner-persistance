'use strict';
/* global $ tripModule attractionsModule hotels restaurants activities */

/**
 * This module fills the `select` tags with `option`s.
 * It runs immediately upon document ready (not called by other modules).
 * Each `option` displays the name of an attraction and is has a value of
 * that attraction's id. Selecting an option looks up the attraction by id,
 * then tells the trip module to add the attraction.
 */


var hotels;
var restaurants;
var activities;

$(function() {

    // jQuery selects
    var $optionsPanel = $('#options-panel');
    var $hotelSelect = $optionsPanel.find('#hotel-choices');
    var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
    var $activitySelect = $optionsPanel.find('#activity-choices');
    console.log('heeey');
    $.get('/api/hotels')
        .then(function(foundhotels) {
            console.log('hoooo');
            console.log(hotels);
            hotels = foundhotels
            foundhotels.forEach(makeOption, $hotelSelect);
        })
        .catch(console.error.bind(console));

    $.get('/api/restaurants')
        .then(function(foundrestaurants) {
            restaurants = foundrestaurants
            foundrestaurants.forEach(makeOption, $restaurantSelect);
        })
        .catch(console.error.bind(console));

    $.get('/api/activities')
        .then(function(foundactivities) {
            activities = foundactivities
            foundactivities.forEach(makeOption, $activitySelect);
        })
        .catch(console.error.bind(console));


    // make all the option tags (second arg of `forEach` is a `this` binding)
    // hotels.forEach(makeOption, $hotelSelect);
    // restaurants.forEach(makeOption, $restaurantSelect);
    // activities.forEach(makeOption, $activitySelect);

    function makeOption(databaseAttraction) {
        console.log('about to append stuff!');
        var $option = $('<option></option>') // makes a new option tag
            .text(databaseAttraction.name)
            .val(databaseAttraction.id);
        this.append($option); // add the option to the specific select
    }

    // what to do when the `+` button next to a `select` is clicked
    $optionsPanel.on('click', 'button[data-action="add"]', function() {
        var $select = $(this).siblings('select');
        var type = $select.data('type'); // from HTML data-type attribute
        var id = $select.find(':selected').val();
        // get associated attraction and add it to the current day in the trip


        function getByTypeAndId(type, id) {
            if (type === 'hotel') return findById(enhanced.hotels, id);
            else if (type === 'restaurant') return findById(enhanced.restaurants, id);
            else if (type === 'activity') return findById(enhanced.activities, id);
            else throw Error('Unknown attraction type');
        }

        function findById(array, id) {
            return array.find(function(el) {
                return +el.id === +id;
            });
        }

        var attraction = getByTypeAndId(type, id);
        tripModule.addToCurrent(attraction);
    });

});
