// flag generation

var types = ['horizontalStriped', 'verticalStriped', 'solid'];
var typeProbabilities = [6,10,1];

var flagType = '';

var horStripeRand = Math.random() * typeProbabilities[0];
var verStripeRand = Math.random() * typeProbabilities[1];
var solidRand = Math.random() * typeProbabilities[2];

if (horStripeRand > verStripeRand && horStripeRand > solidRand) {
	// use horizontal stripes on flag
	flagType = types[0];
}
else if (verStripeRand > horStripeRand && verStripeRand > solidRand) {
	// use vertical stripes on flag
	flagType = types[1];
}
else {
	// use solid flag
	flagType = types[2];
}
console.log('flag type is: ' + flagType);

// end flag generation





// name generation
var names = [];

for (var i = 0; i < 2; i++) {
	var vowels = ['a', 'a', 'e', 'e', 'i', 'o', 'o', 'u', 'y'];
	var consonants = ['b', 'c', 'd', 'g', 'k', 'l', 'm', 'n', 'p', 's', 't', 'v']; // not exhaustive

	var a = 97;
	var name = '';

	var pattern = 'cvccvc';
	var patternLength = pattern.length;

	for (var j = 0; j < patternLength; j++) {
		if (pattern[j] == 'c') {
			// get consonant
			var consonantIndex = Math.ceil(consonants.length * Math.random()) - 1;
			consonant = consonants[consonantIndex];
			name += consonant;
		}
		else {
			// get vowel
			var vowelIndex = Math.ceil(vowels.length * Math.random()) - 1;
			vowel = vowels[vowelIndex];
			name += vowel;
		}
	}
	// capitalize first letter
	var name = name.replace(/^[a-z]/, function(m){ return m.toUpperCase() });

	names.push(name);
}
// end name generation

console.log(names);


// population
// y = a/x + b where population = y
var populations = [];
var humanReadables = [];

for (var i = 0; i < 2; i++) {
	var x = Math.random();
	var a = 8e5;
	var b = 1e6 * Math.random();
	var population = Math.round(a/x + b);
	populations.push(population);
	humanReadables.push(population.toLocaleString());
}
// end population
console.log('populations: ' + humanReadables[0] + ' and ' + humanReadables[1]);


// education
// higher education level => better weaponry
var educationLevels = [];
for (var i = 0; i < 2; i++) {
	educationLevels.push(Math.random());
}
console.log('education levels: ' + educationLevels[0] + ' and ' + educationLevels[1]);
// end education

// capabilities
var capabilities = [];
for (var i = 0; i < 2; i++) {
	var landCapability = Math.random();
	var airCapability = Math.random();
	var seaCapability = Math.random();
	capabilities.push([landCapability, airCapability, seaCapability]);
}
// end capabilities

// battles
var battles = [];

var numBattles = 3 + Math.ceil(Math.random() * 15);

var battleTypeImpacts = [10,12,5]; // land, air, sea
var battleTypeNames = ['land', 'air', 'sea']
var numTypes = battleTypeImpacts.length;

var battleDeltas = [];

var wins1 = 0;
var wins2 = 0;

for (var i = 0; i < numBattles; i++) {
	var formLevels = [Math.random(), Math.random()];
	var battleType = Math.floor(Math.random() * numTypes);
	// console.log('Battle number ' + (i + 1) + '; of type ' + battleTypeNames[battleType]);

	var battleTypestr = battleTypeNames[battleType];
	var battleTypeImpact = battleTypeImpacts[battleType];

	var results = [];

	for (var j = 0; j < 2; j++) {
		var result = formLevels[j] * (capabilities[j][battleType] / battleTypeImpact)
		results.push(result);
	}

	var delta = results[0] - results[1];
	battleDeltas.push(delta);

	var winner = '';
	if (delta > 0) {
		winner = names[0];
		wins1++;
	}
	else {
		winner = names[1];
		wins2++;
	}

	battles.push({
		type: battleTypestr,
		delta: delta,
		winner: winner
	})
}

var deltaTotal = 0; // initialize

for (i in battleDeltas) {
	deltaTotal += battleDeltas[i];
}

document.addEventListener('DOMContentLoaded', function() {
	var outputEl = document.querySelector('.output');
	if (deltaTotal > 0) {
		// army 1 won
		console.log('The first army won!');
		outputEl.innerHTML = '<h1>'+names[0]+' won!</h1>';
	}
	else {
		// army 2 won
		console.log('The second army won!');
		outputEl.innerHTML = '<h1>'+names[1]+' won!</h1>';
	}
	console.log(battles);

	// draw flag
	var flagColors = ['lightblue', 'salmon', 'lightgreen', 'skyblue', 'black', 'white', 'orange', '#FFFF66', '#009966', '#999966', '#330066', '#3366CC', '#CC0000'];
	var numColors = flagColors.length;

	if (flagType == 'verticalStriped') {
		var numStripes = 2 + Math.round(Math.random()); // 2 or 3
		for (var i = 0; i < numStripes; i++) {
			$('.flag').append('<div class="stripe verstripe"></div>');
		}

		if (numStripes == 2) {
			// change to 50% height
			$('.verstripe').css('height', '50vh');
		}
	}

	else if (flagType == 'horizontalStriped') {
		var numStripes = 2 + Math.round(Math.random()); // 2 or 3
		for (var i = 0; i < numStripes; i++) {
			$('.flag').append('<div class="stripe horstripe"></div>');
		}

		if (numStripes == 2) {
			// change to 50% width
			$('.horstripe').css('width', '50vw');
		}
	}

	else {
		// solid
		$('.flag').append('<div class="stripe solid"></div>');
	}



	// no matter what flag type
	var usedColors = [];
	$('.stripe').each(function() {
		// assing random color to flag stripe
		var color = 'purple';
		do {
			color = flagColors[Math.floor(numColors * Math.random())];
		} while (usedColors.indexOf(color) != -1)
		usedColors.push(color);
		$(this).css('background', color);
	});
})