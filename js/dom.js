
/////////////////////////// Game Page
let playAgainst = "";
let smartAI = true;
let firstPeerPlayer = "";

const IMGCOOKIE = "img/cookieAI.jpg";
const IMGICECREAM = "img/icHuman.jpg";
const WINCOOKIE = "img/cookiewins.png";
const WINICECREAM = "img/icwins.png";

let playerHumanObj = { //default values
  name: "Human",
  player: "X",
  img: IMGICECREAM,
  winimg: WINICECREAM,
  roundswon: 0
};

let playerHumanObjB = { //default values
  name: "Human B",
  player: "O",
  img: IMGCOOKIE,
  winimg: WINCOOKIE,
  roundswon: 0
};

let playerAIObj = { //default values
  name: "Computer",
  player: "O",
  img: IMGCOOKIE,
  winimg: WINCOOKIE,
  roundswon: 0
};

let winnerImg = "img/draw.png";
let winnerMsg = "It's a draw!";

const clickBox = function () {
  //console.log("");
  const name = this.getAttribute('name');//this.attr('name');
  const idx = name.split('_')[1];

  const gameover = gamePlay(parseInt(idx));

  if (gameover===true) {
	  gameOver();
	  addShuffle();
	  displayRounds();
	  removeHandler();
	  localStore();
  } else {
    if (playAgainst==="peer") {
      //setup next player
      if (currentTurn==="playerA") {
        currentTurn = "playerB";
      } else {
        currentTurn = "playerA";
      }
      displayGameStatus();
    }
  }

};

const displayGameStatus = function() {
  let name = "";

  if (playAgainst==="peer") {
    if (currentTurn==="playerA") {
      name = playerHumanObj.name;
    } else if (currentTurn==="playerB"){
      name = playerHumanObjB.name;
    }
  } else {
    name = playerHumanObj.name;
  }

  $('#gamestatus').html(name + "'s turn now...");
  $('#gamestatus').addClass("imgblue tab blink");
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

  if (playAgainst==="AI") {
    if (gameArray[index]===playerHumanObj.player) {
  	   boxElement.setAttribute('src', playerHumanObj.img);
    } else {
  	   boxElement.setAttribute('src', playerAIObj.img);
    }
  } else {
    if (gameArray[index]===playerHumanObj.player) {
  	   boxElement.setAttribute('src', playerHumanObj.img);
    } else {
  	   boxElement.setAttribute('src', playerHumanObjB.img);
    }
  }

  pNode.replaceChild(boxElement, elemOld);

  $(jId).off('click', clickBox);
};

const playAgain = function () {
	retrieveLocalStore();
	$('#gameboard').html("");
	$('#playagain').html("");
	$('#playagain').attr('visibility', "hidden");

  getCustom();
	setupBoard();

	if (playFirstAI===true) {
		startAI();
	}

  if (playAgainst==="peer" && peerPlayFirst!=="") {
    //two players
    currentTurn = peerPlayFirst;
    //displayGameStatus();
  }
  displayGameStatus();
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
  let rounds;
  if (playAgainst==="AI") {
  	const winH = "win" + (playerHumanObj.roundswon===1 ? "" : "s" );
  	const winA = "win" + (playerAIObj.roundswon===1 ? "" : "s") ;
    rounds = `${playerHumanObj.name}: ${playerHumanObj.roundswon} ${winH}  |  ${playerAIObj.name}: ${playerAIObj.roundswon} ${winA}`;
  } else {
    const winH = "win" + (playerHumanObj.roundswon===1 ? "" : "s" );
  	const winA = "win" + (playerHumanObjB.roundswon===1 ? "" : "s") ;
  	rounds = `${playerHumanObj.name}: ${playerHumanObj.roundswon} ${winH}  |  ${playerHumanObjB.name}: ${playerHumanObjB.roundswon} ${winA}`;
  }
	$('#roundswon').html(rounds);
};

const getCustom = function(){
  let customFound = false;
	const x = window.location.href;
	if (x.includes("index.html?")) {
    $('#gamestatus').html("");
    customFound = true;
		const customvals = x.split("?")[1]; //holder of values

    if (customvals.includes("playAgainst=peer")) {
      playAgainst = "peer";

      //Names
      let playerName = "";
    		if (customvals.includes("playerNameA=")) {
    			playerName = customvals.split("playerNameA=")[1];
  			playerName = playerName.substring(0, playerName.indexOf('&'));
  			if (playerName!=="") {
          playerHumanObj.name = playerName;
        }
  		}

      //player B
    		if (customvals.includes("playerNameB=")) {
    			playerName = customvals.split("playerNameB=")[1];
  			playerName = playerName.substring(0, playerName.indexOf('&'));
  			if (playerName!=="") {
          playerHumanObjB.name = playerName;
        }
  		}

      //player icecream
      let player = ""; //marker
    		if (customvals.includes("player=")) {
    			player = customvals.split("player=")[1];
  			player = player.substring(0, player.indexOf('&'));

  			if (player==="icecream") { //default
  				humanPlayer = "X";
  				aiPlayer = "O";
  			} else {
  				humanPlayer = "O";
  				aiPlayer = "X";

  				playerHumanObj.player = "O";
  				playerHumanObjB.player = "X";

          playerHumanObj.img = IMGCOOKIE;
  				playerHumanObjB.img = IMGICECREAM;

  				playerHumanObj.winimg = WINCOOKIE;
  				playerHumanObjB.winimg = WINICECREAM;
        }
      }

      //playfirst A or B
      //peerPlayFirst
    		if (customvals.includes("playFirstPeer=")) {
    			peerPlayFirst = customvals.split("playFirstPeer=")[1];
  			  peerPlayFirst = peerPlayFirst.substring(0, peerPlayFirst.indexOf('&'));
        }

    } else {
      playAgainst = "AI";
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

				playerHumanObj.img = IMGCOOKIE;
				playerAIObj.img = IMGICECREAM;

				playerHumanObj.winimg = WINCOOKIE;
				playerAIObj.winimg = WINICECREAM;
			}
		}

		let pFirstAI = ""; //who plays first
		if (customvals.includes("playFirstAI")) {
  			pFirstAI = customvals.split("playFirstAI=")[1];
        pFirstAI = pFirstAI.substring(0, pFirstAI.indexOf('&'));

			if (pFirstAI==="false") {
				playFirstAI = false;
			} else {
				playFirstAI = true;
			}
		}

    let compdumb = ""; //smart or dumb AI
    //computerdumb
    //smartAI
    if (customvals.includes("computerdumb")) {
  			compdumb = customvals.split("computerdumb=")[1];
        compdumb = compdumb.substring(0, compdumb.indexOf('&'));

			if (compdumb==="false") {
				smartAI = true;
			} else {
				smartAI = false;
			}
		}


    }
  } else {
    //defaults
    smartAI = true;
    playFirstAI = false;
    playAgainst = "AI";
  }

  return customFound;
};

const gameOver = function() {
	// Get the modal
	const modal = $('#myModal');

	// Get the image and insert it inside the modal
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

  $('#gamestatus').removeClass("imgblue tab blink");
  $('#gamestatus').html("");
};


const localStore = function() {
	if (typeof(Storage) !== "undefined") {
		// store
		localStorage.setItem('playerHumanObj', JSON.stringify(playerHumanObj));
		localStorage.setItem('playerAIObj', JSON.stringify(playerAIObj));
		localStorage.setItem('playerHumanObjB', JSON.stringify(playerHumanObjB));

    localStorage.setItem('peerPlayFirst', peerPlayFirst);
    localStorage.setItem('playFirstAI', playFirstAI);
	}
};

const retrieveLocalStore = function() {
	if (typeof(Storage) !== "undefined") {
		//Then to retrieve it from the store and convert to an object again:
		playerHumanObj = JSON.parse(localStorage.getItem('playerHumanObj'));
		playerAIObj = JSON.parse(localStorage.getItem('playerAIObj'));
		playerHumanObjB = JSON.parse(localStorage.getItem('playerHumanObjB'));

    peerPlayFirst = localStorage.getItem('peerPlayFirst');
    playFirstAI = localStorage.getItem('playFirstAI');
	}
};

const startGame = function() {
  //localStorage.clear(); //start fresh
  //retrieveLocalStore();
  peerPlayFirst = "";

  const customFound = getCustom(); //in case there are custom settings

  // initial display of the game
  setupBoard();

  if (playFirstAI===true) {
    startAI();
  }

  if (peerPlayFirst!=="") {
    //two players
    currentTurn = peerPlayFirst;
  } else {
    currentTurn = "";
  }

  if (customFound) {
    displayGameStatus();
  }
};

$(document).ready( startGame );
