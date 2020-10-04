//array to store the moves
let humanPlayer = "X";
let aiPlayer = "O";
let winnerPlayer = "";
let playFirstAI = false;
let winnerArray;
let peerPlayFirst = ""; // if human players this will have a value
let currentTurn = "";

const gameArray = ["", "", "",
  "", "", "",
  "", "", ""];

//available moves
const validPairs = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

//check for winning
const isWinningLine = function (player) {
  const g = gameArray; //for neatness
  const p = player; const v = validPairs;
  let win = false;

  for (let y = 0; y < v.length; y++) {
    if (g[v[y][0]] === p && g[v[y][1]] === p && g[v[y][2]] === p) {
      winnerArray = v[y];
      winnerPlayer = player;
      win = true; //yes, winning
      break;
    }
  }
  return win;
};

const countEmpty = function () {
  let total = 0;
  for (let g = 0; g < gameArray.length; g++) {
    if (gameArray[g] === "") {
      total += 1;
    }
  }
  return total;
};

const getPossiblePlacements = function (index) {
  let pArray = [];

  //strategy: handle corner, should choose center = 4
  if (smartAI) {
    if (index === 0 || index === 2 || index === 6 || index === 8) {
      for (let y = 0; y < validPairs.length; y++) {
        if (validPairs[y].includes(4) && validPairs[y].includes(index)) { //center, choose a corner
          if (gameArray[4] === "") {
            pArray.push(validPairs[y]); //only if available
          }
        }
        // greedy greedy plays
        // add rows for more chances of winning
        if(index === 2 && validPairs[y].includes(index) ) {
          const idxs = [4, 5, 6, 8];
          for (let i2=0; i2 < idxs.length; i2++) {
            const icur = idxs[i2];
            if(gameArray[icur] !== "" && validPairs[y].includes(icur)) {
              pArray.push(validPairs[y]); //only if available
            }
          }
          if(gameArray[0] === "" && validPairs[y].includes(0)) {
            pArray.push(validPairs[y]); //only if available
          }
          if(gameArray[1] === "" && validPairs[y].includes(1)) {
            pArray.push(validPairs[y]); //only if available
          }
        }

        if(index === 6 && validPairs[y].includes(index) ) {
          const idxs = [0, 3, 4, 7, 8];
          for (let i2=0; i2 < idxs.length; i2++) {
            const icur = idxs[i2];
            if(gameArray[icur] !== "" && validPairs[y].includes(icur)) {
              pArray.push(validPairs[y]); //only if available
            }
          }
        }

        if(index === 0 && validPairs[y].includes(index) ) {
          const idxs = [1, 2, 3, 4, 6];
          for (let i2=0; i2 < idxs.length; i2++) {
            const icur = idxs[i2];
            if(gameArray[icur] !== "" && validPairs[y].includes(icur)) {
              pArray.push(validPairs[y]); //only if available
            }
          }
        }

        if(index === 8 && validPairs[y].includes(index) ) {
          const idxs = [2, 4, 5, 6, 7];
          for (let i2=0; i2 < idxs.length; i2++) {
            const icur = idxs[i2];
            if(gameArray[icur] !== "" && validPairs[y].includes(icur)) {
              pArray.push(validPairs[y]); //only if available
            }
          }
        }

      }
    }
  } //smartAI

  //usual strategy
  if (pArray.length === 0) {
    // given index return all possible valid pairings
    for (let y = 0; y < validPairs.length; y++) {
      if (validPairs[y].includes(index)) {
        //check if valid
        const g0 = validPairs[y][0]; const g1 = validPairs[y][1]; const g2 = validPairs[y][2];
        if (gameArray[g0] === "" || gameArray[g1] === "" || gameArray[g2] === "") {
          pArray.push(validPairs[y]); //only if available
        }
      }
      // greedy greedy plays
      if(index === 1 && gameArray[3] !== "" && gameArray[0] === "" && validPairs[y].includes(0) ) { 
        pArray.push(validPairs[y]); //only if available
      }
      if(index === 1 && gameArray[5] !== "" && gameArray[2] === "" && validPairs[y].includes(2) && validPairs[y].includes(4) ) { 
        pArray.push(validPairs[y]); //only if available
      }
      if(index === 5 && gameArray[4] !== "" && gameArray[8] === "" && validPairs[y].includes(8) ) { 
        pArray.push(validPairs[y]); //only if available
      }
    }
  }

  //however if there is no slot left, pick those with empty spot
  if (pArray.length === 0) {
    // given index return all possible valid pairings
    for (let y = 0; y < validPairs.length; y++) {
      //no need to compare with index
      const g0 = validPairs[y][0]; const g1 = validPairs[y][1]; const g2 = validPairs[y][2];
      if (gameArray[g0] === "" || gameArray[g1] === "" || gameArray[g2] === "") {
        pArray.push(validPairs[y]); //only if available
      }
    }
  }

  //check other possible arrPossiblePlacements that makes AI win
  //added feature instead of just chasing off the human player
  if (smartAI) {
    if (pArray.length > 0) {
      for (let y = 0; y < validPairs.length; y++) {
        if (!pArray.includes(validPairs[y])) {
          const g0 = validPairs[y][0]; const g1 = validPairs[y][1]; const g2 = validPairs[y][2];
          if (gameArray[g0] === "" || gameArray[g1] === "" || gameArray[g2] === "") {
            if ((gameArray[g0] === aiPlayer && gameArray[g0] === gameArray[g1]) ||
              (gameArray[g2] === aiPlayer && gameArray[g2] === gameArray[g1]) ||
              (gameArray[g2] === aiPlayer && gameArray[g2] === gameArray[g0])
            ) {
              pArray.push(validPairs[y]); //stretegy to win
            }
          }
        }
      }
    }
  } //smartAI

  return pArray;
};

const points = function (str, includeSpace = true) {
  if (includeSpace) {
    if (str === "") return 1;
  }
  if (str === aiPlayer) return 2;
  if (str === humanPlayer) return 3; //human, high score so AI can block it
  return 0; //if no option
};

const totalPointsOfArray = function (arr) {
  let total = 0;
  for (let x = 0; x < arr.length; x++) { //inner is 3
    const gIdx = arr[x];
    total += points(gameArray[gIdx], false); // do not include space
  }
  return total;
};

const getHighestScore = function (pArray) {
  let hightotal = 0;
  let total = 0;
  let highArray = []; //initial value

  //randomize the order of the arrays for unpredictability
  const r = []; //random order of pArray contents
  const t = pArray.length;

  //setup random indexes
  if (t > 1) {
    for (let y = 0; y < t; y++) {
      let tempInd = 0;
      do {
        tempInd = Math.floor(Math.random() * t);
      } while (r.includes(tempInd) === true);
      r[y] = tempInd;
    }
  }

  let y = 0;
  for (let i = 0; i < t; i++) {
    total = 0;
    if (t > 1) {
      y = r[i];
    } else {
      y = i;
    }

    //usual points
    for (let x = 0; x < 3; x++) { //inner is 3
      const gIdx = pArray[y][x];
      total += points(gameArray[gIdx]);
    }

    if (smartAI) {
      //additional points for candidate wins
      const g0 = pArray[y][0]; const g1 = pArray[y][1]; const g2 = pArray[y][2];

      //AI winning, highest score
      if ((gameArray[g0] === "" || gameArray[g1] === "" || gameArray[g2] === "")
        && ((gameArray[g0] === aiPlayer && gameArray[g0] === gameArray[g1]) ||
          (gameArray[g2] === aiPlayer && gameArray[g2] === gameArray[g1]) ||
          (gameArray[g2] === aiPlayer && gameArray[g2] === gameArray[g0]))) {
        total += 100;
      }

      //human winning, AI trying to block it, scores higher too
      if ((gameArray[g0] === "" || gameArray[g1] === "" || gameArray[g2] === "")
        && ((gameArray[g0] === humanPlayer && gameArray[g0] === gameArray[g1]) ||
          (gameArray[g2] === humanPlayer && gameArray[g2] === gameArray[g1]) ||
          (gameArray[g2] === humanPlayer && gameArray[g2] === gameArray[g0]))) {
        total += 50;
      }
    }//smartAI

    //check points
    if (total > hightotal) {
      hightotal = total;
      if (highArray.length > 0) {
        highArray.pop();
      }
      highArray.push(pArray[y]);
    }
  }
  return {
    array: highArray[0],
    points: hightotal
  };
};

const checkWinner = function () {
  let win = false;
  if (isWinningLine(humanPlayer) || isWinningLine(aiPlayer)) {
    win = true;
  }
  if (win === true) {
    // handle winner
    let name = "";
    if (playAgainst === "AI") {
      if (winnerPlayer === playerHumanObj.player) { //base on marker
        name = playerHumanObj.name;
        playerHumanObj.roundswon += 1;
        winnerImg = playerHumanObj.winimg;
      } else {
        name = "Computer"; //playerAIObj.name;
        playerAIObj.roundswon += 1;
        winnerImg = playerAIObj.winimg;
      }
    } else {
      //peer
      if (winnerPlayer === playerHumanObj.player) { //base on marker
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
    winnerImg = DRAWIMG;
    winnerMsg = DRAWMSG;
  }
  return win;
};

const canPlay = function () {
  if (gameArray.includes("")) {
    return true;
  }
  return false;
};

const occupy = function (aIdx) {
  if (gameArray[aIdx] === "") {
    gameArray[aIdx] = aiPlayer;
    showBoard(aIdx);
    return true;
  }
  return false;
};

const potentialPoints = function (array, player) {
  //return index
  let highTotal = 0;
  const a = array;
  const g = gameArray;
  let total = 0;
  let index = -1;
  const pointsPlayer = points(player);
  for (let y = 0; y < validPairs.length; y++) {
    for (let x = 0; x < a.length; x++) {
      if (a !== validPairs[y] && g[a[x]] === "" && validPairs[y].includes(a[x])) {
        total = totalPointsOfArray(validPairs[y]);
        if (total > 0 && total % pointsPlayer === 0) {
          // probably found a match
          total += 50; //increase score
        }
        total += pointsPlayer;  //add possible candidate
        if (total > highTotal) {
          highTotal = total;
          index = a[x];
        }
      }
    }
  }
  // other greedy center moves
  if(array.includes(4) && g[4]==="" && g[index]==="") {
    index = 4; // choose center if index chosen is outer
  }
  if(g[4]==="" && total<10) {
    index = 4; 
  }
  if(g[4]!=="" && total<10) {
    if ( g[6]==="" && array.includes(7) ) {
      if (g[1]!=="" && g[2]==="") {
        index = 2;
      } else {
        index = 6; 
      }
    }
    if ( g[0]==="" && array.includes(5) ) {
      index = 0; 
    }
    if ( g[2]==="" && array.includes(5) ) {
      if (g[6]!=="" || g[5]!=="") {
        index = 2; 
      } else {
        index = 6; 
      }
    }
  }
  return index;
};

const retOpponent = function (str) {
  if (str === "X") return "O";
  if (str === "O") return "X";
}

const playAI = function (arrayObj, index) {
  try {
    let array = arrayObj.array;
    let pts = arrayObj.points;
    let placed = false;
    let gIdx = array.indexOf(index);
    if (gIdx < 0) {
      gIdx = 1; //choose center for candidate rows, other than those it belongs to
    }

    if (smartAI && pts < 50) { //50 points or higher means a row is targeted already
      if (array[gIdx] === 4) { //handle center
        const t = [0, 2, 6, 8] //choose from corners
        let counter = 0;
        do {
          let idxr = Math.floor(Math.random() * t.length);
          placed = occupy(t[idxr]);
          counter++;
        } while (placed === false && counter < t.length)
      }
      if (!placed) {
        const tempIdx = array[gIdx];
        const highIndex = potentialPoints(array, retOpponent(gameArray[tempIdx])); //get high scoring spot, tada
        if (highIndex > -1) {
          placed = occupy(highIndex);
        }
      }
    } //smartAI

    if (placed === false) { //if no high potential scoring index found

      if (gIdx - 1 >= 0) {
        //left exists
        let aIdx = array[gIdx - 1];
        placed = occupy(aIdx);
        if (placed === false) {
          aIdx = array[gIdx - 2];
          placed = occupy(aIdx);
        }
      }
      if (placed === false && gIdx + 1 < 3) {
        //right exists
        let aIdx = array[gIdx + 1];
        placed = occupy(aIdx);
        //if leftmost
        if (placed === false) {
          aIdx = array[gIdx + 2];
          placed = occupy(aIdx);
        }
      }

      //check itself
      if (placed === false) {
        placed = occupy(array[gIdx]);
      }

      // last resort
      if (placed === false) {
        for (let y = 0; y < validPairs.length; y++) {
          const cur = validPairs[y];
          if (cur[gIdx] === index) {
            if (gameArray[gIdx+1] === "") {
              placed = occupy(gIdx+1);
            }
            if (placed === false) {
              // other plays 
            }
            if (placed === true) {
              break;
            }
          }
        }
      }
    } //

    return placed;
  } catch (e) {
    //
  }

};

const resetGameArray = function () {
  for (let y = 0; y < gameArray.length; y++) {
    gameArray[y] = "";
  }
};

const gamePlay = function (index) {
  // setup array
  if (currentTurn === "playerA") {
    gameArray[index] = playerHumanObj.player;
  } else if (currentTurn === "playerB") {
    gameArray[index] = playerHumanObjB.player;
  } else { //AI
    gameArray[index] = humanPlayer;
  }

  showBoard(index);

  // check if there's a winner
  if (checkWinner()) {
    blinkWinnerRow();
    return true;
  }

  if (playAgainst === "AI") {
    // given an index, get possible placements
    const arrPossiblePlacements = getPossiblePlacements(index);
    console.log("arrPossiblePlacements: " + arrPossiblePlacements);

    // get highest score row
    const highScoreRowObj = getHighestScore(arrPossiblePlacements);

    // place in the nearby empty spot
    playAI(highScoreRowObj, index);

    // check if there's a winner
    if (checkWinner()) {
      blinkWinnerRow();
      return true;
    }
  } //AI

  // check canPlay for next move
  if (!canPlay()) {
    //reset
    resetGameArray();
    return true;
  }
  return false; //continue playing
};

const startAI = function () {
  const gIdx = Math.floor(Math.random() * gameArray.length);
  gameArray[gIdx] = aiPlayer;
  showBoard(gIdx);
};
