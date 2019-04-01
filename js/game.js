//array to store the moves
/*const gameArray = [ "", "", "",
                    "", "", "",
                    "", "", "" ];*/

const gameArray = [ "", "", "",
                    "", "", "",
                    "", "X", "" ];


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
const validDiagonal = [0, 2, 4, 6, 8];

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
      pArray.push(validPairs[y]);
    }
  }
  return pArray;
};

const points =  function(str) {
  if (str==="") return 1;
  if (str==="O") return 2;
  if (str==="X") return 3; //human
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
      //if (gIdx!=0 && gIdx!=3 && gIdx!=6) {
      const gIdxMin1 = pArray[y][x-1];

        if ( gameArray[gIdx]!=="" && gameArray[gIdx]===gameArray[gIdxMin1] ) {
          total = total * 2;
        }
      //}
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
  if (isWinningLine("X") || isWinningLine("O")) {
    //handle winning or endgame

    return true;
  }
  return false;
};

const canPlay = function() {
  if (gameArray.includes("")) {
    return true;
  }
  return false;
};

const playAI = function(array, index) {
  for (let x=0; x<3; x++) { //inner is 3
    const gIdx = array[x];
    if (gIdx!==index && gameArray[gIdx]==="") {
      // mark the spot
      gameArray[gIdx] = "O";
      break;
    }
  }
};

const gamePlay = function(index) {

  // given an index, get possible placements
  const arrPossiblePlacements = getPossiblePlacements(index);

  // get highest score
  const highScore = getHighestScore(arrPossiblePlacements);

  // place O in the nearby empty spot
  playAI(highScore, index);

  // check if there's a winner
  if ( checkWinner() ) {
    console.log("Winner found");
  };

  // check canPlay for next move
  if ( canPlay() ) {
    console.log("Can still play");
  };

};
