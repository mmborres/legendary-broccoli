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

const playAgain = function () {
	document.getElementById("gameboard").innerHTML = "";
	document.getElementById("playagain").innerHTML = "";
	setupBoard();
};

const addShuffle = function() {
	
	let parent = document.getElementById("playagain"); //parent
	
	let bt = document.createElement('button');
		bt.setAttribute('id', "shufflebutton");
		bt.addEventListener('click', playAgain);
		bt.innerHTML = "Play Again?";

	/*let hbt = document.createElement('button');
			hbt.setAttribute('class', "hidden");
			hbt.setAttribute('id', "buttonextra");
			hbt.innerHTML = "HIDDENHIDDENHIIDDDDEENNN";*/
			
	if (parent!==null) {
		//parent.appendChild(hbt);
		parent.appendChild(bt);
	}
};

const removeHandler = function () {
	for (let i = 0; i < 9; i++) {
      const idBox = "#idBox_" + i;
      const $boxElement = $(idBox);
      $boxElement.off('click', clickBox );
    }
};

const setupBoard = function() {
  let idb = 0;
  for (let i = 0; i < 3; i++) {
    const $divRow = $('<div>');

    for (let j = 0; j < 3; j++) {
    //setup game gameboard

      const $boxElement = $('<span>');
      $boxElement.attr('class', "guessword");
      const idBox = "idBox_" + idb;
      $boxElement.attr('id', idBox);
	  $boxElement.attr('name', idBox);
      $boxElement.html("O");
      $boxElement.on('click', clickBox );

      $divRow.append($boxElement);

      idb += 1;
    }
      $('#gameboard').append($divRow);
    }
};


const startGame = function() {
  // initial display of the game
  setupBoard();

};

$(document).ready( startGame );
