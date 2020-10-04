/////////////////////////// Game Page DOM

let playAgainst = "";
let smartAI = true;
let firstPeerPlayer = "";

const IMGCOOKIE = "img/cookieAI.jpg";
const IMGICECREAM = "img/icHuman.jpg";
const WINCOOKIE = "img/cookiewins.png";
const WINICECREAM = "img/icwins.png";
const DRAWMSG = "It's a draw!";
const DRAWIMG = "img/draw.png";

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

let winnerImg = DRAWIMG
let winnerMsg = DRAWMSG;

const clickBox = function () {
	const name = this.getAttribute('name');
	const idx = name.split('_')[1];

	const gameover = gamePlay(parseInt(idx));

	if (gameover === true) {
		gameOver();
		addShuffle();
		displayRounds();
		removeHandler();
		currentTurn = peerPlayFirst;
		localStore();
	} else {
		if (playAgainst === "peer") {
			//setup next player
			if (currentTurn === "playerA") {
				currentTurn = "playerB";
			} else {
				currentTurn = "playerA";
			}
			displayGameStatus();
		}
	}

};

const displayGameStatus = function () {
	let name = "";

	if (playAgainst === "peer") {
		if (currentTurn === "playerA") {
			name = playerHumanObj.name;
		} else if (currentTurn === "playerB") {
			name = playerHumanObjB.name;
		}
	} else {
		name = playerHumanObj.name;
	}

	$('#gamestatus').html(name + "'s turn now...");
	$('#gamestatus').addClass("imgblue tab blink");
};

const blinkWinnerRow = function () {
	for (let g = 0; g < winnerArray.length; g++) {
		const idBox = "idBox_" + winnerArray[g];
		const jId = "#" + idBox;
		$(jId).addClass("imgblue tab blink");
	}
};

const showBoard = function (index) {
	const idBox = "idBox_" + index;
	const jId = "#" + idBox;
	const elemOld = document.getElementById(idBox);
	const pNode = elemOld.parentNode;

	const boxElement = document.createElement('img');
	boxElement.setAttribute('class', "answeredword");
	boxElement.setAttribute('id', idBox);
	boxElement.setAttribute('name', idBox);

	if (playAgainst === "AI") {
		if (gameArray[index] === playerHumanObj.player) {
			boxElement.setAttribute('src', playerHumanObj.img);
		} else {
			boxElement.setAttribute('src', playerAIObj.img);
		}
	} else {
		if (gameArray[index] === playerHumanObj.player) {
			boxElement.setAttribute('src', playerHumanObj.img);
		} else {
			boxElement.setAttribute('src', playerHumanObjB.img);
		}
	}

	pNode.replaceChild(boxElement, elemOld);

	$(jId).off('click', clickBox);
};

const playAgain = function () {

	$('#gameboard').html("");
	$('#playagain').html("");
	$('#playagain').attr('visibility', "hidden");

	retrieveLocalStore();
	setupBoard();

	if (playFirstAI || playFirstAI === true) {
		startAI();
	}

	displayGameStatus();
};

const addShuffle = function () {
	const $playAgain = $('<img>');
	$playAgain.attr('src', "img/playagain.gif");
	$playAgain.attr('class', "imgbutton");
	$playAgain.attr('height', "65");
	$playAgain.attr('width', "200");
	$playAgain.on('click', playAgain);

	const $resetstats = $('<img>');
	$resetstats.attr('src', "img/resetstats.jpg");
	$resetstats.attr('class', "imgbutton");
	$resetstats.attr('height', "60");
	$resetstats.attr('width', "140");
	$resetstats.on('click', resetStats);

	$('#playagain').append($playAgain);
	$('#playagain').append($resetstats);

	$('#playagain').attr('visibility', "visible");
};

const removeHandler = function () {
	for (let i = 0; i < 9; i++) {
		const idBox = "#idBox_" + i;
		$(idBox).off('click', clickBox);
	}
};

const setupBoard = function () {
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
			$boxElement.on('click', clickBox);

			$divRow.append($boxElement);
			idb += 1;
		}

		$('#gameboard').append($divRow);
	}
	displayRounds();
};

const displayRounds = function () {
	let rounds;
	if (playAgainst === "AI") {
		const winH = "win" + (playerHumanObj.roundswon === 1 ? "" : "s");
		const winA = "win" + (playerAIObj.roundswon === 1 ? "" : "s");
		rounds = `${playerHumanObj.name}: ${playerHumanObj.roundswon} ${winH}  |  Computer: ${playerAIObj.roundswon} ${winA}`;
	} else {
		const winH = "win" + (playerHumanObj.roundswon === 1 ? "" : "s");
		const winA = "win" + (playerHumanObjB.roundswon === 1 ? "" : "s");
		rounds = `${playerHumanObj.name}: ${playerHumanObj.roundswon} ${winH}  |  ${playerHumanObjB.name}: ${playerHumanObjB.roundswon} ${winA}`;
	}
	$('#roundswon').html(rounds);
};

const getCustom = function () {
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
				if (playerName !== "") {
					playerHumanObj.name = playerName;
				} else {
					playerHumanObj.name = "Player A";
				}
				playerHumanObj.roundswon = 0;
			}

			//player B
			if (customvals.includes("playerNameB=")) {
				playerName = customvals.split("playerNameB=")[1];
				playerName = playerName.substring(0, playerName.indexOf('&'));
				if (playerName !== "") {
					playerHumanObjB.name = playerName;
				} else {
					playerHumanObjB.name = "Player B";
				}
				playerHumanObjB.roundswon = 0;
			}

			//player icecream
			let player = ""; //marker
			if (customvals.includes("player=")) {
				player = customvals.split("player=")[1];
				player = player.substring(0, player.indexOf('&'));

				if (player === "icecream") { //default
					humanPlayer = "X";
					aiPlayer = "O";

					playerHumanObj.player = "X";
					playerHumanObjB.player = "O";

					playerHumanObj.img = IMGICECREAM;
					playerHumanObjB.img = IMGCOOKIE;

					playerHumanObj.winimg = WINICECREAM;
					playerHumanObjB.winimg = WINCOOKIE;

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

				//AI
				playFirstAI = false;
			}

		} else {
			playAgainst = "AI";
			//handle NAME of human player
			//playerName of Human
			let playerName = "";
			if (customvals.includes("playerName=")) {
				playerName = customvals.split("playerName=")[1];
				playerName = playerName.substring(0, playerName.indexOf('&'));
				if (playerName !== "") {
					playerHumanObj.name = playerName;
				} else {
					playerHumanObj.name = "Human";
				}
				playerHumanObj.roundswon = 0;
				playerAIObj.roundswon = 0; //reset scores
			}

			let player = ""; //marker
			if (customvals.includes("player=")) {
				player = customvals.split("player=")[1];
				player = player.substring(0, player.indexOf('&'));

				if (player === "icHuman") { //default
					humanPlayer = "X";
					aiPlayer = "O";

					playerHumanObj.player = "X";
					playerAIObj.player = "O";

					playerHumanObj.img = IMGICECREAM;
					playerAIObj.img = IMGCOOKIE;

					playerHumanObj.winimg = WINICECREAM;
					playerAIObj.winimg = WINCOOKIE;


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

				if (pFirstAI === "false") {
					playFirstAI = false;
				} else {
					playFirstAI = true;
				}

				//peer
				peerPlayFirst = "";
			}

			let compdumb = ""; //smart or dumb AI
			//computerdumb
			//smartAI
			if (customvals.includes("computerdumb")) {
				compdumb = customvals.split("computerdumb=")[1];
				compdumb = compdumb.substring(0, compdumb.indexOf('&'));

				//if (compdumb === "false") {
					smartAI = true;
					playerAIObj.name = "Computer";

				// } else {
				// 	smartAI = false;
				// 	playerAIObj.name = "Computer";
				// }
			}
		}
	}

	return customFound;
};

const gameOver = function () {
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
	span.onclick = function () {
		modal.css({ display: "none" });
	}

	$('#gamestatus').removeClass("imgblue tab blink");
	$('#gamestatus').html("");
};


const localStore = function () {
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem('previous', true);

		// store
		localStorage.setItem('playerHumanObj', JSON.stringify(playerHumanObj));
		localStorage.setItem('playerAIObj', JSON.stringify(playerAIObj));
		localStorage.setItem('playerHumanObjB', JSON.stringify(playerHumanObjB));

		localStorage.setItem('peerPlayFirst', peerPlayFirst);
		localStorage.setItem('playFirstAI', playFirstAI);
		localStorage.setItem('smartAI', smartAI);
		localStorage.setItem('playAgainst', playAgainst);

		localStorage.setItem('aiPlayer', aiPlayer);
		localStorage.setItem('humanPlayer', humanPlayer);

		localStorage.setItem('currentTurn', currentTurn);
	}
};

const retrieveLocalStore = function () {
	let temp;
	let retrieved = false;
	if (typeof (Storage) !== "undefined") {
		const previous = localStorage.getItem('previous');

		if (previous || previous === "true") {
			//Then to retrieve it from the store and convert to an object again:
			temp = JSON.parse(localStorage.getItem('playerHumanObj'));
			if (temp != null) {
				playerHumanObj = temp;
			}
			temp = JSON.parse(localStorage.getItem('playerAIObj'));
			if (temp != null) {
				playerAIObj = temp;
			}
			temp = JSON.parse(localStorage.getItem('playerHumanObjB'));
			if (temp != null) {
				playerHumanObjB = temp;
			}

			temp = localStorage.getItem('peerPlayFirst');
			if (temp != null) {
				peerPlayFirst = temp; //playerA or playerB
			}
			temp = localStorage.getItem('playFirstAI');
			if (temp != null) {

				if (temp || temp === true || temp === "true") {
					playFirstAI = true;
				}
				if (!temp || temp === false || temp === "false") {
					playFirstAI = false;
				}
			}
			temp = localStorage.getItem('smartAI');
			if (temp != null) {

				if (temp || temp === true || temp === "true") {
					smartAI = true;
				}
				if (!temp || temp === false || temp === "false") {
					smartAI = true; //always true moving forward
				}
			}

			temp = localStorage.getItem('playAgainst');
			if (temp != null) {
				playAgainst = temp; //peer
			}

			temp = localStorage.getItem('aiPlayer');
			if (temp != null) {
				aiPlayer = temp; //X or O
			}
			temp = localStorage.getItem('humanPlayer');
			if (temp != null) {
				humanPlayer = temp;
			}
			temp = localStorage.getItem('currentTurn');
			if (temp != null) {
				currentTurn = temp; //playerA
			}

			retrieved = true;
		}
	}
	return retrieved;
};

const resetStats = function () {
	const ans = confirm("This will reset scores to zero, as well as the game. Are you sure?");

	if (ans) { //if true
		localStorage.clear(); //start fresh

		$('#gameboard').html("");
		$('#playagain').html("");
		$('#playagain').attr('visibility', "hidden");

		window.location.replace('index.html');
	}
};

const startGame = function () {

	const x = window.location.href;
	if (x.endsWith("legendary-broccoli/") || x.includes("index.html")) {

		const retrieved = retrieveLocalStore(); //in case game is in progress
		const customFound = getCustom(); //in case there are custom settings

		if (peerPlayFirst !== "") {
			//two players
			currentTurn = peerPlayFirst;
		} else {
			currentTurn = "";
		}

		if (customFound || retrieved) {
			displayGameStatus();
		} else { //no customisation nor local storage
			//defaults
			smartAI = true;
			playFirstAI = false;
			playAgainst = "AI";
		}

		// initial display of the game
		setupBoard();

		if (playFirstAI || playFirstAI === true) {
			startAI();
		}

		// save new settings
		if (customFound) {
			localStore();
		}

	}
};

$(document).ready(startGame);
