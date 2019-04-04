//////////////////////////// Custom Page

const playerHuman = function() {
  //if human is chosen, remove listener
  //make sure other listener is ON
  $('#icHuman').off('click', playerHuman);
  $('#cookieAI').on('click', playerAI);

  $('#player').val("icHuman");
  alert("Game on, Ice Cream Addict!")
};

const playerAI = function() {
  $('#icHuman').on('click', playerHuman);
  $('#cookieAI').off('click', playerAI);

  $('#player').val("playerAI");
  alert("Game on, Cookie Monster!")
};

const playFirst = function() {
	if ( document.getElementById("alertYes").checked === true) {
  		playFirstAI = false;
		$('#playFirstAI').val("false");
	}
	if (document.getElementById("alertNo").checked === true) {
		playFirstAI = true;
		$('#playFirstAI').val("true");
	}
	alert("Game on, you play " + ( playFirstAI===true ? "second." : "first.") );
};

/////////////////////////// Game Page

let playerHumanObj = { //default values
  name: "Human",
  player: "X",
  img: "img/icHuman.jpg",
  winimg: "img/icwins.png",
  roundswon: 0
};

let playerAIObj = { //default values
  name: "Computer",
  player: "O",
  img: "img/cookieAI.jpg",
  winimg: "img/cookiewins.png",
  roundswon: 0
};

let winnerImg = "img/draw.png";
let winnerMsg = "It's a draw!";

const clickBox = function () {
  console.log("");
  const name = this.getAttribute('name');//this.attr('name');
  const idx = name.split('_')[1];

  const gameover = gamePlay(parseInt(idx));
  if (gameover===true) {
	  gameOver();
	  addShuffle();
	  displayRounds();
	  removeHandler();
	  localStore();
  }

};

const blinkWinnerRow = function() {
  for (let g=0; g<winnerArray.length; g++) {
    const idBox = "idBox_" + winnerArray[g];
    const jId = "#" + idBox;
    $(jId).addClass("imgblue tab blink");
  }
};

const showBoard = function(index) {
  const idBox = "idBox_" + index;
  const jId = "#" + idBox;
  const elemOld = document.getElementById(idBox);
  const pNode = elemOld.parentNode;

  const boxElement = document.createElement('img');
  boxElement.setAttribute('class', "answeredword");
  boxElement.setAttribute('id', idBox);
  boxElement.setAttribute('name', idBox);

  if (gameArray[index]===playerHumanObj.player) {
	   boxElement.setAttribute('src', playerHumanObj.img);
  } else {
	   boxElement.setAttribute('src', playerAIObj.img);
  }

  pNode.replaceChild(boxElement, elemOld);

  $(jId).off('click', clickBox);
};

const playAgain = function () {
	retrieveLocalStore();
	$('#gameboard').html("");
	$('#playagain').html("");
	$('#playagain').attr('visibility', "hidden");
	setupBoard();

	if (playFirstAI===true) {
		startAI();
	}
};

const addShuffle = function() {
	const $playAgain = $('<img>');
    $playAgain.attr('src', "img/playagain.gif");
	  $playAgain.attr('class', "imgbutton");
    $playAgain.on('click', playAgain );

	$('#playagain').append($playAgain);
	$('#playagain').attr('visibility', "visible");
};

const removeHandler = function () {
	for (let i = 0; i < 9; i++) {
      const idBox = "#idBox_" + i;
      $(idBox).off('click', clickBox );
    }
};

const setupBoard = function() {
  let idb = 0;
  for (let i = 0; i < 3; i++) {
    const $divRow = $('<div>');
	  $divRow.attr('class', "imgrow");

    for (let j = 0; j < 3; j++) {
    //setup game gameboard
		  const $boxElement = $('<img>');
		  $boxElement.attr('class', "guessword");
		  const idBox = "idBox_" + idb;
		  $boxElement.attr('id', idBox);
		  $boxElement.attr('name', idBox);
	    $boxElement.attr('src', "img/back.png");
		  $boxElement.on('click', clickBox );

		  $divRow.append($boxElement);
		  idb += 1;
    }

    $('#gameboard').append($divRow);
  }
  displayRounds();
};

const displayRounds = function() {
	const winH = "win" + (playerHumanObj.roundswon===1 ? "" : "s" );
	const winA = "win" + (playerAIObj.roundswon===1 ? "" : "s") ;
	const rounds = `${playerHumanObj.name}: ${playerHumanObj.roundswon} ${winH}  |  ${playerAIObj.name}: ${playerAIObj.roundswon} ${winA}`;
	$('#roundswon').html(rounds);
};

const getCustom = function(){
	const x = window.location.href;
	if (x.includes("index.html?")) {
		const customvals = x.split("?")[1]; //holder of values

		//handle NAME of human player
		//playerName of Human
		let playerName = "";
  		if (customvals.includes("playerName=")) {
  			playerName = customvals.split("playerName=")[1];
			playerName = playerName.substring(0, playerName.indexOf('&'));
			if (playerName!=="") { playerHumanObj.name = playerName; }
		}

		let player = ""; //marker
  		if (customvals.includes("player=")) {
  			player = customvals.split("player=")[1];
			player = player.substring(0, player.indexOf('&'));

			if (player==="icHuman") { //default
				humanPlayer = "X";
				aiPlayer = "O";
			} else {
				humanPlayer = "O";
				aiPlayer = "X";

				playerHumanObj.player = "O";
				playerAIObj.player = "X";

				let tempImg = playerHumanObj.img; //hold
				playerHumanObj.img = playerAIObj.img;
				playerAIObj.img = tempImg;

				tempImg = playerHumanObj.winimg; //hold
				playerHumanObj.winimg = playerAIObj.winimg;
				playerAIObj.winimg = tempImg;

			}
		}

		let pFirstAI = ""; //who plays first
		if (customvals.includes("playFirstAI")) {
  			pFirstAI = customvals.split("playFirstAI=")[1];

			if (pFirstAI.includes("false")) {
				playFirstAI = false;
			} else {
				playFirstAI = true;
			}
		}
    }
};

const gameOver = function() {
	// Get the modal
	const modal = $('#myModal');

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	const modalImg = $('#img01');
	const captionText = $('#caption');

  modal.css({ display: "block" });
	modalImg.attr('src', winnerImg);
	captionText.html(winnerMsg);

	// Get the <span> element that closes the modal
	const span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.css({ display: "none" });
	}
};


const localStore = function() {
	if (typeof(Storage) !== "undefined") {
		// store
		localStorage.setItem('playerHumanObj', JSON.stringify(playerHumanObj));
		localStorage.setItem('playerAIObj', JSON.stringify(playerAIObj));
	}
};

const retrieveLocalStore = function() {
	if (typeof(Storage) !== "undefined") {
		//Then to retrieve it from the store and convert to an object again:
		playerHumanObj = JSON.parse(localStorage.getItem('playerHumanObj'));
		playerAIObj = JSON.parse(localStorage.getItem('playerAIObj'));
	}
};

const startGame = function() {
  localStorage.clear(); //start fresh

  getCustom(); //in case there are custom settings

  // initial display of the game
  setupBoard();

  if (playFirstAI===true) {
    startAI();
  }
};

$(document).ready( startGame );
