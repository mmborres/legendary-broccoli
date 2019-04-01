const clickBox = function () {
  console.log("");
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
      $boxElement.html("W");
      $boxElement.on('click', clickBox );

      //const bElement = $boxElement;
      //bElement.addEventListener('click', clickBox (idb));

      $divRow.append($boxElement);
      //const idQuery = "'#" + idBox + "'";
      //$(idQuery).on('click', clickBox(idb) );


      idb += 1;
    }
      $('#gameboard').append($divRow);
    }
};


const startGame = function() {
  // initial display of the game

  setupBoard();

  //gamePlay(7);

};

$(document).ready( startGame );
