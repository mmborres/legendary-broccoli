/// Custom Page
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

/// Game Page
const playerHumanObj = {
  player: "X",
  img: "img/icHuman.jpg"
};

const playerAIObj = {
  player: "O",
  img: "img/cookieAI.jpg"
};

const clickBox = function () {
  console.log("");
  const name = this.getAttribute('name');//this.attr('name');
  const idx = name.split('_')[1];

  const gameover = gamePlay(parseInt(idx));
  if (gameover===true) {
	  addShuffle();
	  removeHandler();
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
	$('#gameboard').html("");
	$('#playagain').html("");
	setupBoard();
};

const addShuffle = function() {
	  const $playAgain = $('<img>');
    $playAgain.attr('src', "img/playagain.gif");
	  $playAgain.attr('class', "imgbutton");
    $playAgain.on('click', playAgain );

	  $('#playagain').append($playAgain);
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
};

const getCustom = function(){
	const x = window.location.href;
  //index.html?player=icHuman&alert=on&playFirstAI=true
  if (x.includes("index.html?")) {
  		const customvals = x.split("?")[1]; //holder of values

      let player = "";
  		if (customvals.includes("player")) {
  			player = customvals.split("=")[1];
        player = player.substring(0, player.indexOf('&'));

        if (player==="icHuman") { //default
          humanPlayer = "X";
          aiPlayer = "O";
        } else {
          humanPlayer = "O";
          aiPlayer = "X";

          playerHumanObj.player = "O";
          playerAIObj.player = "X";

          const tempImg = playerHumanObj.img; //hold
          playerHumanObj.img = playerAIObj.img;
          playerAIObj.img = tempImg;
        }

      }

      let pFirstAI = "";
      if (customvals.includes("playFirstAI")) {
  			pFirstAI = customvals.split("playFirstAI=")[1];

        if (pFirstAI==="false") {
            playFirstAI = false;
        } else {
            playFirstAI = true;
        }
      }
    }
};

const startGame = function() {
  getCustom(); //in case there are custom settings

  // initial display of the game
  setupBoard();

  if (playFirstAI===true) {
    startAI();
  }
};

$(document).ready( startGame );
