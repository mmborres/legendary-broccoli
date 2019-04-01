//array to store the moves

const gameArray = [ "", "", "",
                    "", "", "",
                    "", "", "" ];


//check for winning
const isWinningLine = function (player) {
  const g = gameArray; //for neatness
  const p = player;
        //horizontal lines
  if ( g[0]===p && g[1]===p && g[2]===p ||
       g[3]===p && g[4]===p && g[5]===p ||
       g[6]===p && g[7]===p && g[8]===p ||
       //vertical lines
       g[0]===p && g[3]===p && g[6]===p ||
       g[1]===p && g[4]===p && g[7]===p ||
       g[2]===p && g[5]===p && g[8]===p ||
       //remainging digonal lines
       g[0]===p && g[4]===p && g[8]===p ||
       g[2]===p && g[4]===p && g[6]===p ) {
         return true; //yes, winning
       } else {
         return false; //losing
       }
};

//available moves
const validPairs = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const getPossiblePlacements = function (index) {
  let pArray = [];
  // given index return all possible valid pairings
  for (let y=0; y< validPairs.length; y++) {
    if ( validPairs[y].includes(index) ) {
	  //check if valid
	  const g0 = validPairs[y][0];
	  const g1 = validPairs[y][1];
	  const g2 = validPairs[y][2];
	  
	  if ( gameArray[g0]==="" || gameArray[g1]==="" || gameArray[g2]==="" ) {
		pArray.push(validPairs[y]); //only if available
	  }
    }
  }
  return pArray;
};

const points =  function(str) {
  if (str==="") return 1;
  if (str==="O") return 2;
  if (str==="X") return 3; //human, high score so it will be chosen
};

const getHighestScore = function(pArray) {
  let hightotal = 0;
  let total = 0;
  let highArray = []; //initial value
  for (let y=0; y<pArray.length; y++) {
    total = 0;
    for (let x=0; x<3; x++) { //inner is 3
      const gIdx = pArray[y][x];
      total += points( gameArray[gIdx] );
      const gIdxMin1 = pArray[y][x-1];

        if ( gameArray[gIdx]!=="" && gameArray[gIdx]===gameArray[gIdxMin1] ) {
          total = total * 2;
        }

    }
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
  if (isWinningLine("X") || isWinningLine("O")) {
    win = true;
  }
  
  if ( win===true ) {
    // handle winner
	alert("winner");
	//reset
	resetGameArray();
  }
  return win;
};

const canPlay = function() {
  if (gameArray.includes("")) {
    return true;
  }
  return false;
};

const playAI = function(array, index) {
try {  
  const gIdx = array.indexOf(index);
  
  if ( gIdx-1 >=0 ) {
	  //left exists
	  let aIdx = array[gIdx-1]; 
	  if ( gameArray[aIdx] === "" ) {
		  gameArray[aIdx] = "O";
		  showBoard(aIdx);
		  return;
	  }  
	  aIdx = array[gIdx-2]; 
	  if ( gameArray[aIdx] === "" ) {
		  gameArray[aIdx] = "O";
		  showBoard(aIdx);
		  return;
	  }  
  }
  if ( gIdx+1 <3 ) {
	  //right exists
	  let aIdx = array[gIdx+1]; 
	  if ( gameArray[aIdx] === "" ) {
		  gameArray[aIdx] = "O";
		  showBoard(aIdx);
		  return;
	  }  
	  //if leftmost
	  aIdx = array[gIdx+2];
	  if ( gameArray[aIdx] === "" ) {
		  gameArray[aIdx] = "O";
		  showBoard(aIdx);
		  return;
	  } 
  }
} catch (e) {
	//TODO
}
  
};

const showBoard = function(index) {
  const idBox = "idBox_" + index;

  const boxElement = document.createElement('span');
  boxElement.setAttribute('class', "answeredword");
  boxElement.setAttribute('id', idBox);
  

  const elemOld = document.getElementById(idBox);
  const pNode = elemOld.parentNode;
  
  pNode.replaceChild(boxElement, elemOld);

  document.getElementById(idBox).innerHTML = gameArray[index];
  $(idBox).off('click', clickBox);
};

const resetGameArray = function() {
	for (let y=0; y<gameArray.length; y++) {
		gameArray[y] = "";
	}
};

const gamePlay = function(index) {
  // setup array
  gameArray[index] = "X";
  showBoard(index);
  
  // check if there's a winner
  if ( checkWinner() ) {
    return true;
  }

  // given an index, get possible placements
  const arrPossiblePlacements = getPossiblePlacements(index);

  // get highest score
  const highScore = getHighestScore(arrPossiblePlacements);

  // place O in the nearby empty spot
  playAI(highScore, index);

  // check if there's a winner
  if ( checkWinner() ) {
    return true;
  }

  // check canPlay for next move
  if ( !canPlay() ) {
	//reset
	resetGameArray();
    return true;
  }
  return false; //continue playing

};



