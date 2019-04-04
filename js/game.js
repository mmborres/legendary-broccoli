//array to store the moves
let humanPlayer = "X";
let aiPlayer = "O";
let winnerPlayer = "";
let playFirstAI = false;
let winnerArray;
let peerPlayFirst = ""; // if human players this will have a value
let currentTurn = "";

const gameArray = [ "", "", "",
                    "", "", "",
                    "", "", "" ];

//available moves
const validPairs = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

//check for winning
const isWinningLine = function (player) {
  const g = gameArray; //for neatness
  const p = player;
  const v = validPairs;
  let win = false;

  for (let y=0; y<v.length; y++) {
    if ( g[ v[y][0] ]===p && g[ v[y][1] ]===p && g[ v[y][2] ]===p ) {
         winnerArray = v[y];
         winnerPlayer = player;
         win = true; //yes, winning
         break;
       }
  }
  return win;
};

const countEmpty = function() {
  let total = 0;
  for (let g=0; g<gameArray.length; g++) {
    if (gameArray[g]==="") {
      total += 1;
    }
  }
  return total;
};

const getPossiblePlacements = function (index) {
  let pArray = [];

  //strategy: handle corner, should choose center = 4
  if (smartAI) {
    if (index===0 || index===2 || index===6 || index===8) {
      for (let y=0; y< validPairs.length; y++) {
        if ( validPairs[y].includes(4) && validPairs[y].includes(index) ) { //center, choose a corner
          if ( gameArray[4]==="" ) {
              pArray.push(validPairs[y]); //only if available
          }
        }
      }
    }

    //strategy: handle center, when chosen by player early in the game
    if (index===4 && countEmpty()>7) {
      for (let y=0; y< validPairs.length; y++) {
        if ( validPairs[y].includes(4) && (validPairs[y].includes(6) || validPairs[y].includes(8)) ) { //center, choose a corner
          const g0 = validPairs[y][0]; const g1 = validPairs[y][1]; const g2 = validPairs[y][2];
          if ( gameArray[g0]==="" || gameArray[g1]==="" || gameArray[g2]==="" ) {
              pArray.push(validPairs[y]); //only if available
          }
        }
      }
    }
  } //smartAI

  //usual strategy
  if (pArray.length===0) {
    // given index return all possible valid pairings
    for (let y=0; y< validPairs.length; y++) {
      if ( validPairs[y].includes(index) ) {
  	       //check if valid
  	      const g0 = validPairs[y][0]; const g1 = validPairs[y][1]; const g2 = validPairs[y][2];
          if ( gameArray[g0]==="" || gameArray[g1]==="" || gameArray[g2]==="" ) {
              pArray.push(validPairs[y]); //only if available
  	      }
      }
    }
  }

  //however if there is no slot left, pick those with empty spot
  if (pArray.length===0) {
    // given index return all possible valid pairings
    for (let y=0; y< validPairs.length; y++) {
  	      //no need to compare with index
  	      const g0 = validPairs[y][0]; const g1 = validPairs[y][1]; const g2 = validPairs[y][2];
          if ( gameArray[g0]==="" || gameArray[g1]==="" || gameArray[g2]==="" ) {
              pArray.push(validPairs[y]); //only if available
  	      }
    }
  }

  //check other possible arrPossiblePlacements that makes AI win
  //added feature instead of just chasing off the human player
  if (smartAI) {
    if (pArray.length>0) {
      for (let y=0; y< validPairs.length; y++) {
    	      if (!pArray.includes(validPairs[y])) {
      	      const g0 = validPairs[y][0]; const g1 = validPairs[y][1]; const g2 = validPairs[y][2];
              if ( gameArray[g0]==="" || gameArray[g1]==="" || gameArray[g2]==="" ) {
                if ( (gameArray[g0]===aiPlayer && gameArray[g0]===gameArray[g1]) ||
                      (gameArray[g2]===aiPlayer && gameArray[g2]===gameArray[g1]) ||
                      (gameArray[g2]===aiPlayer && gameArray[g2]===gameArray[g0])
                    ) {
                  pArray.push(validPairs[y]); //stretegy to win
                }
      	      }
          }
      }
    }
  }

  return pArray;
};

const points =  function(str) {
  if (str==="") return 1;
  if (str===aiPlayer) return 2;
  if (str===humanPlayer) return 3; //human, high score so AI can block it
};

const getHighestScore = function(pArray) {
  let hightotal = 0;
  let total = 0;
  let highArray = []; //initial value
  for (let y=0; y<pArray.length; y++) {
    total = 0;
    //usual points
    for (let x=0; x<3; x++) { //inner is 3
      const gIdx = pArray[y][x];
      total += points( gameArray[gIdx] );
    }

    if (smartAI) {
      //additional points for candidate wins
      const g0 = pArray[y][0]; const g1 = pArray[y][1]; const g2 = pArray[y][2];

      //AI winning, highest scoe
      if ( ( gameArray[g0]==="" || gameArray[g1]==="" || gameArray[g2]==="" )
          && ( (gameArray[g0]===aiPlayer && gameArray[g0]===gameArray[g1]) ||
            (gameArray[g2]===aiPlayer && gameArray[g2]===gameArray[g1]) ||
            (gameArray[g2]===aiPlayer && gameArray[g2]===gameArray[g0]) ) ) {
              total += 100;
      }

      //human winning, AI trying to block it, scores higher too
      if ( ( gameArray[g0]==="" || gameArray[g1]==="" || gameArray[g2]==="" )
          && ( (gameArray[g0]===humanPlayer && gameArray[g0]===gameArray[g1]) ||
            (gameArray[g2]===humanPlayer && gameArray[g2]===gameArray[g1]) ||
            (gameArray[g2]===humanPlayer && gameArray[g2]===gameArray[g0]) ) ) {
              total += 50;
      }
    }
    //check points
    if (total>hightotal) {
      hightotal = total;
      if (highArray.length> 0) {
        highArray.pop();
      }
      highArray.push(pArray[y]);
    }
  }
  return highArray[0];
};

const checkWinner = function() {
  let win = false;
  if (isWinningLine(humanPlayer) || isWinningLine(aiPlayer)) {
    win = true;
  }
  if ( win===true ) {
      // handle winner
      let name = "";
      if (playAgainst==="AI") {
        if (winnerPlayer===playerHumanObj.player) { //base on marker
          name = playerHumanObj.name;
  		    playerHumanObj.roundswon += 1;
  		    winnerImg = playerHumanObj.winimg;
        } else {
          name = playerAIObj.name;
  		    playerAIObj.roundswon += 1;
  		    winnerImg = playerAIObj.winimg;
        }
      } else {
        //peer
        if (winnerPlayer===playerHumanObj.player) { //base on marker
          name = playerHumanObj.name;
  		    playerHumanObj.roundswon += 1;
  		    winnerImg = playerHumanObj.winimg;
        } else {
          name = playerHumanObjB.name;
  		    playerHumanObjB.roundswon += 1;
  		    winnerImg = playerHumanObjB.winimg;
        }
      }

	    //alert(name + " is the winner!");
		  winnerMsg = name + " is the winner!";
	    //reset
	    resetGameArray();
  } else {
	  winnerImg = "img/draw.png";
	  winnerMsg = "It's a draw!"
  }
  return win;
};

const canPlay = function() {
  if (gameArray.includes("")) {
    return true;
  }
  return false;
};

const occupy = function(aIdx) {
  if ( gameArray[aIdx] === "" ) {
    gameArray[aIdx] = aiPlayer;
    showBoard(aIdx);
    return true;
  }
  return false;
};

const playAI = function(array, index) {
try {
  let placed = false;
  let gIdx = array.indexOf(index);
  if (gIdx<0) {
    gIdx = 1; //choose center for candidate rows, other than those it belongs to
  }

  if ( gIdx-1 >=0 ) {
	  //left exists
	  let aIdx = array[gIdx-1];
	  placed = occupy(aIdx);
	  if (placed===false) {
      aIdx = array[gIdx-2];
  	  placed = occupy(aIdx);
    }
  }
  if ( placed===false && gIdx+1 <3 ) {
	  //right exists
	  let aIdx = array[gIdx+1];
	  placed = occupy(aIdx);
	  //if leftmost
	  if (placed===false) {
      aIdx = array[gIdx+2];
  	  placed = occupy(aIdx);
    }
  }

  //check itself
  if (placed === false) {
    placed = occupy(array[gIdx]);
  }

  return placed;
} catch (e) {
	//
}

};

const resetGameArray = function() {
	for (let y=0; y<gameArray.length; y++) {
		gameArray[y] = "";
	}
};

const gamePlay = function(index) {
  // setup array
  if (currentTurn==="playerA") {
    gameArray[index] = playerHumanObj.player;//humanPlayer;
  } else if (currentTurn==="playerB"){
    gameArray[index] = playerHumanObjB.player;
  } else {
    gameArray[index] = humanPlayer;
  }

  showBoard(index);

  // check if there's a winner
  if ( checkWinner() ) {
    blinkWinnerRow();
    return true;
  }

  if (playAgainst==="AI") {
    // given an index, get possible placements
    const arrPossiblePlacements = getPossiblePlacements(index);

    // get highest score row
    const highScoreRow = getHighestScore(arrPossiblePlacements);

    // place O in the nearby empty spot
    playAI(highScoreRow, index);

    // check if there's a winner
    if ( checkWinner() ) {
      blinkWinnerRow();
      return true;
    }
 }

  // check canPlay for next move
  if ( !canPlay() ) {
	  //reset
	  resetGameArray();
    return true;
  }
  return false; //continue playing

};

const startAI = function() {
  const gIdx = Math.floor(Math.random() * gameArray.length);
  gameArray[gIdx] = aiPlayer;
  showBoard(gIdx);
};
