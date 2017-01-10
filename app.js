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
	count = 3,
	timetest,
	userSequence = [],
	strict = false,
	gameOn = false;

function lights(sequence){ //input array, allowed vals are 'red', 'blue', 'yellow', 'green' html must use those ids and colors
	function light(color){
	
		var panel = document.getElementById(color);
			//sound = color + 'Sound';
			//console.log(sound);
		//blueSound.play();
		//console.log(liteColor[color]);
		liteColor[color].sound.play();
		panel.style.background = liteColor[color].lit;
		timetest = setTimeout(function(){panel.style.background = liteColor[color].dark;},800);
	}
	
	for (item in sequence){
		(function(item){//not the same item, this is a closure
			setTimeout(function(){
				light(sequence[item]);
			},(item +1)*200);// Probably not best practice, works on my pc, but others?
			//console.log(item + sequence[item]);
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
		//console.log(rnd);
		sequence.push(colors[rnd]);
	}
	return sequence;
}
function initializeGame(){
	sequence = makeSequence(3);//TODO change to 20 after done testing
	count = 1;  //TODO change to 20 or one something else later
	userSequence = [];
	//console.log(sequence);
	//console.log(userSequence);
}
function playPattern(howMany){

	var partSequence = sequence.slice(0, howMany);
	lights(partSequence);
}

function compareUserSequence(clickedButton){
	userSequence.push(clickedButton);
	if (userSequence.join(',') === sequence.slice(0,count).join(',')){
		console.log('good choice' + playPattern);
		count = count + 1;
		userSequence = [];
		setTimeout(function(){
			playPattern(count);
		}, 800);
		//playPattern(count);
	} else console.log(userSequence.join(',') === sequence.slice(0,count).join(','));
}



document.getElementById("red").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['red']);
	compareUserSequence('red');
	console.log('____ clicked');
});
document.getElementById("blue").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['blue']);
	compareUserSequence('blue');
	console.log('____ clicked');
});
document.getElementById("yellow").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['yellow']);
	compareUserSequence('yellow');
	console.log('____ clicked');
});
document.getElementById("green").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['green']);
	compareUserSequence('green');
	console.log('____ clicked');
});
document.getElementById("start").addEventListener("click", function(event){//start
	event.preventDefault(); // prevents resize on iphone dblclick
	initializeGame(); //TODO change to 20 when done testing
	playPattern(count);
	console.log('start clicked');
});		
document.getElementById("strict").addEventListener("click", function(event){//strict
	event.preventDefault(); // prevents resize on iphone dblclick
	strict =! strict;
	//TODO make light on/off
	console.log('strict clicked');
});
document.getElementById("on-off").addEventListener("click", function(event){//on-off
	event.preventDefault(); // prevents resize on iphone dblclick
	gameOn =! gameOn;
	initializeGame();
	//TODO on-off css toggle left/right float of blue div
	console.log('on-off clicked');
});
		
