var 
	redSound = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
	blueSound = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
	yellowSound = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
	greenSound = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
liteColor = {
	red : {dark: "#7F1818",
			lit: "#c22525",
			sound: redSound},
	yellow: {dark: "#E5CE33",
			lit: "#F7F69E",
			sound: yellowSound},
	blue: {dark: "#1D25AB",
			lit: "#328EE0",
			sound: blueSound},
	green: {dark: "#1F662A",
			lit: "#1FA22A",
			sound: greenSound}			
};

var sequence = [], 
	count = 4,
	timetest,
	userSequence = [];

function lights(sequence){ //input array, allowed vals are 'red', 'blue', 'yellow', 'green' html must use those ids and colors
	function light(color){
	
		var panel = document.getElementById(color);
			//sound = color + 'Sound';
			//console.log(sound);
		//blueSound.play();
		console.log(liteColor[color]);
		liteColor[color].sound.play();
		panel.style.background = liteColor[color].lit;
		timetest = setTimeout(function(){panel.style.background = liteColor[color].dark;},800);
	}
	
	for (item in sequence){
		(function(item){//not the same item, this is a closure
			setTimeout(function(){
				light(sequence[item]);
			},(item +1)*150);// Probably not best practice, works on my pc, but others?
			console.log(item + sequence[item]);
		})(item);
	}
}


function makeSequence(num){
	var color,
		rnd,
		sequence = [],
		colors = (['red', 'blue', 'yellow', 'green']);
	for (var i = 0; i < num; i++){
		rnd = Math.floor(Math.random()*4);
		console.log(rnd);
		sequence.push(colors[rnd]);
	}
	return sequence;
}

//lights(sequence);

//var testDemo = makeSequence(5);


//lights(testDemo);

document.getElementById("red").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['red']);
	userSequence.push('red');
	console.log('____ clicked');
});
document.getElementById("blue").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['blue']);
	userSequence.push('blue');
	console.log('____ clicked');
});
document.getElementById("yellow").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['yellow']);
	userSequence.push('yellow');
	console.log('____ clicked');
});
document.getElementById("green").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['green']);
	userSequence.push('green');
	console.log('____ clicked');
});
		
		
function initializeGame(){
	sequence = makeSequence(4);//change to 20 after done testing
	count = 1;
	userSequence = [];
	//console.log(sequence);
	//console.log(userSequence);
}

function playPattern(howMany){ //where howMany is the portion of the sequence.  usu is count in global scope.
	console.log('here');
	lights(sequence.slice(0,howMany));
	var timer = setTimeout(timesUp, 10000); //TODO write timeup func to handle both match or no match
	var tester = setInterval(getUserSequence, 100);
	function getUserSequence(){
		console.log(userSequence);
		if (userSequence.join(',') === sequence.join(',')){
			clearInterval(tester);
			clearInterval(timer);
			console.log(userSequence);
			timesUp();
		}
	}
	function timesUp(){
		if (userSequence.join(',') === sequence.join(',')){
			console.log('sucess!!!!');
		}else {
			console.log('times up');
			clearInterval(tester);
			clearInterval(timer);
		}
	}
	//playPattern(2);//TODO if strict do differnt
	//console.log('here i am');

}


//var getUserSequence = setTimeout(function(){failedUserPattern();}, 5000);
//setTimeout(failedUserPattern, 10000);

initializeGame();
playPattern(4);
//getUserSequence();

		//TODO make comparisons etc, timer stuff
		//start timer for 3 seconds
		//get user data 
		// if data correct increment count
		//if data wrong||timeup, go back same count unless strict mode, reset if strict
	
	

	
//Need this to compare arrays
//thanks http://stackoverflow.com/questions/6229197/how-to-know-if-two-arrays-have-the-same-values




	
	
	
	
	
	

