var	redSound = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var	blueSound = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var	yellowSound = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var	greenSound = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var liteColor = {
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

var sequence = [];
var count;// says how many at each stage.  goes up to 20, set this max in the initialize function
var timetest;
var userSequence = [];
var strict = false;
var gameOn = false;

function lights(sequence){ //input array, allowed vals are 'red', 'blue', 'yellow', 'green' html must use those ids and colors
	function light(color){
	
		var panel = document.getElementById(color);
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

function makeSequence(num){// returns an array of color names with length = num, make sequence of 20 for each new game
	var color,
		rnd,
		sequence = [],
		colors = (['red', 'blue', 'yellow', 'green']);
	for (var i = 0; i < num; i++){
		rnd = Math.floor(Math.random()*4);
		sequence.push(colors[rnd]);
	}
	console.log(sequence);
	return sequence;
}
function initializeGame(){
	sequence = makeSequence(3);//TODO change to 20 after done testing
	count = 1;  //
	userSequence = [];

}
function playPattern(howMany){
	userSequence = [];
	var partSequence = sequence.slice(0, howMany);
	lights(partSequence);
	console.log('playing Pattern');
}
 
function compareUserSequence(clickedButton){
	userSequence.push(clickedButton);
	console.log(userSequence);
	//console.log(userSequence.join(',') + ' ' + sequence.slice(0,count).join(','));
	//if ((userSequence[userSequence.length - 1] === (sequence[userSequence.length - 1]))){
		
		
	
	if (userSequence.join(',') === sequence.slice(0,count).join(',')){
		console.log(userSequence);
		console.log('good choice ' +  userSequence  + ' vs ' + sequence.slice(0,count));
		count = count + 1;
		//userSequence = [];
		(function(){
			setTimeout(function(){
				playPattern(count);
			}, 1000);
		})();

	} else {
		//console.log('wrong color ' + userSequence + ' vs ' + sequence.slice(0,count));//+ userSequence.join(',') === sequence.slice(0,count).join(',')}
		if (clickedButton === sequence[userSequence.length - 1]){
			console.log('okydoky');
		}else{
			console.log('wrong button');
			lights(['red']);
			lights(['yellow']);
			lights(['blue']);
			lights(['green']);
			(function(){
				setTimeout(function(){
					playPattern(count);
				}, 1000);
			})();
		}
		
		;
	
	};
}


document.getElementById("red").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['red']);
	compareUserSequence('red');
	//console.log('____ clicked');
});
document.getElementById("blue").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['blue']);
	compareUserSequence('blue');
	//console.log('____ clicked');
});
document.getElementById("yellow").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['yellow']);
	compareUserSequence('yellow');
	//console.log('____ clicked');
});
document.getElementById("green").addEventListener("click", function(event){
	event.preventDefault(); // prevents resize on iphone dblclick
	lights(['green']);
	compareUserSequence('green');
	//console.log('____ clicked');
});
document.getElementById("start").addEventListener("click", function(event){//start
	event.preventDefault(); // prevents resize on iphone dblclick
	initializeGame(); //TODO change to 20 when done testing
	playPattern(count);
	//console.log('start clicked');
});		
document.getElementById("strict").addEventListener("click", function(event){//strict
	event.preventDefault(); // prevents resize on iphone dblclick
	strict =! strict;
	//TODO make light on/off
	//console.log('strict clicked');
});
document.getElementById("on-off").addEventListener("click", function(event){//on-off
	event.preventDefault(); // prevents resize on iphone dblclick
	gameOn =! gameOn;
	initializeGame();
	//TODO on-off css toggle left/right float of blue div
	//console.log('on-off clicked');
});
		
