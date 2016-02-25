'use strict';

// Set up Jquery clock plugin -- Flipclock.js (Get time)

// Get time from clock and store in variable (breakfast - lunch - dinner)

// Get value from check-box ( Allergies ) ( Diet restrictions )

// $Ajax call - Get information from Yummly API

// Print on thml

// Print button -send to printer

// Add more function

// Light box for about content

var coolApp = {};


coolApp.appId = '9a82c4a1';

coolApp.appKey = 'd750f8a3c48c097b49c0082762f6a0ae';


var mealtime = '';

var allergy = [];

var diet = [];

coolApp.init = function () {
	//code to start app goes in here
	coolApp.gettime();
	coolApp.getinputs();
	
};

coolApp.gettime = function () {
	//code to gather info on time and inputs
	// var currentTime = $.now();
	// console.log(currentTime);
	var dt = new Date();
	var time = dt.getHours();
	console.log(time);
	if (time < 5) {
		// console.log('works');
		mealtime = 'pub';
	} else if (time >= 5 && time < 11) {
		mealtime = 'breakfast';
	} else if (time >= 11 && time < 16) {
		mealtime = 'lunch';
	} else if (time >= 16) {
		mealtime = 'dinner';
	};
};

// coolApp.gettime();

coolApp.getinputs = function () {
	$('.whatToEat').submit(function (e) {
		allergy = [];
		e.preventDefault();
		$('.Allergies input:checked').each(function (i, event) {
			allergy.push(event.value);
		});

		allergy = allergy.join(' ');
		console.log(allergy);
		diet = [];
		$('.diet input:checked').each(function (i, event) {
			diet.push(event.value);
		});
		diet = diet.join(' ');
		console.log(diet);
		coolApp.getRecipe(allergy,diet);
	});

};

// coolApp.getinputs();

coolApp.getRecipe = function (allergy,diet) {
	console.log(mealtime);
	console.log(allergy, diet);
	$.ajax({
		url: 'http://api.yummly.com/v1/api/recipes?_app_id=9a82c4a1&_app_key=d750f8a3c48c097b49c0082762f6a0ae',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			requirePictures: true,
			q: mealtime,
			'allowedAllergy[]': allergy,
			'allowedDiet[]': diet
		}

	}).then(function (res) {
		console.log(res);
	});
};

// coolApp.getRecipe();

coolApp.displayRecipes = function () {};

$(function () {
	coolApp.init();
});