#! usr/bin/env node

/*
 * Module 3 Project
 * JobFinder
 * Keegan Hawkins
 */


const readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
});

const fetch = require('node-fetch');



function doThing(code){
	fetch('https://api.zippopotam.us/us/' + code)
		.then(response => response.json())
		.then(data => {
			let longitude = data.places[0].longitude;
			let latitude = data.places[0].latitude;
			console.log(`Long ${longitude}, Lat ${latitude}`);
			getJobs(longitude, latitude);
		});
		
}

function getJobs(longitude, latitude){
	fetch('https://jobs.github.com/positions.json?lat=' + latitude + '&long=' + longitude)
		.then(response => response.json())
		.then(data => {
			data.forEach(element => console.log('\n\n' + element.location + '\n ================== \n' + element.company + '\n' + element.type + '\n' + element.title + '\n \n' + element.description + '\n ==================\n'));
			console.log('After data forEach');
		});
	readline.close();
	
}

readline.question('Where are you looking for a job?\nZip Code:', code => {doThing(code);});




