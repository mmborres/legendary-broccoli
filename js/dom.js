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

  //const boxElement = document.createElement('span');
  //boxElement.setAttribute('class', "answeredword");
  //boxElement.setAttribute('id', idBox);

  //const $boxElement = $('<span>');
  //$boxElement.attr('class', "answeredword");
  //$boxElement.attr('id', idBox);

  const jId = "#" + idBox;
  const elemOld = document.getElementById(idBox);
  const pNode = elemOld.parentNode;

  const boxElement = document.createElement('img');
  boxElement.setAttribute('class', "answeredword");
  boxElement.setAttribute('id', idBox);
  boxElement.setAttribute('name', idBox);
  
  if (gameArray[index]===humanPlayer) {
	boxElement.setAttribute('src', "img/icHuman.jpg");
  } else {
	boxElement.setAttribute('src', "img/cookieAI.jpg");  
  }
  
  pNode.replaceChild(boxElement, elemOld);

  //document.getElementById(idBox).innerHTML = gameArray[index];
  //$(jId).html(gameArray[index]);
  $(jId).off('click', clickBox);
};

const playAgain = function () {
	//document.getElementById("gameboard").innerHTML = "";
	//document.getElementById("playagain").innerHTML = "";
	$('#gameboard').html("");
	$('#playagain').html("");
	setupBoard();
};

const addShuffle = function() {

	//let parent = document.getElementById("playagain"); //parent

	/*let bt = document.createElement('button');
		bt.setAttribute('id', "shufflebutton");
		bt.addEventListener('click', playAgain);
		bt.innerHTML = "Play Again?";*/

	/*let hbt = document.createElement('button');
			hbt.setAttribute('class', "hidden");
			hbt.setAttribute('id', "buttonextra");
			hbt.innerHTML = "HIDDENHIDDENHIIDDDDEENNN";*/

	//if (parent!==null) {
		//parent.appendChild(hbt);
		//parent.appendChild(bt);
	//}
	
	const $playAgain = $('<img>');
    $playAgain.attr('src', "img/playagain.gif");
	$playAgain.attr('class', "imgbutton");
    $playAgain.on('click', playAgain );
	
	$('#playagain').append($playAgain);
};

const removeHandler = function () {
	for (let i = 0; i < 9; i++) {
      const idBox = "#idBox_" + i;
      //const $boxElement = $(idBox);
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

      /*const $boxElement = $('<span>');
      $boxElement.attr('class', "guessword");
      const idBox = "idBox_" + idb;
      $boxElement.attr('id', idBox);
	  $boxElement.attr('name', idBox);
      $boxElement.html("O");
      $boxElement.on('click', clickBox );*/
	  
	  const $boxElement = $('<img>');
      $boxElement.attr('class', "guessword");
      const idBox = "idBox_" + idb;
      $boxElement.attr('id', idBox);
	  $boxElement.attr('name', idBox);
      //$boxElement.html("O");
	  $boxElement.attr('src', "img/back.png");
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
