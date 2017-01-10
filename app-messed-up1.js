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
		
function initializeGame(){
	sequence = makeSequence(3);//TODO change to 20 after done testing
	count = 1;  //TODO change to 20 or one something else later
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

		//console.log(userSequence[0] + ' and  ' + sequence[0]);
		
		if (userSequence[0]){
			for (var i = 0; i < userSequence.length; i++){
				if (userSequence[i] != sequence[i]){
					console.log('wrong color');
					timesUp();
				}
			}
		}
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
			if (user.sequence.join(',') === sequence.slice(0,count)){//should have join on rigt side too
				count = count + 1;
				console.log('times up' + count);
				clearInterval(tester);
				clearInterval(timer);
				playPattern(count);
			}
		}
	}
	
	
}


