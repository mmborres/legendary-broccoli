//////////////////////////// Custom Page

const playerHuman = function() {
  //if human is chosen, remove listener
  //make sure other listener is ON
  //$('#icHuman').off('click', playerHuman);
  //$('#cookieAI').on('click', playerAI);

  $('#player').val("icHuman");
  //alert("Game on, Ice Cream Addict!")
  $('#chooseicecream').html("Human Player");
  $('#choosecookie').html("Computer");
};

const playerAI = function() {
  //$('#icHuman').on('click', playerHuman);
  //$('#cookieAI').off('click', playerAI);

  $('#player').val("playerAI");
  //alert("Game on, Cookie Monster!")
  $('#chooseicecream').html("Computer");
  $('#choosecookie').html("Human Player");
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
	//alert("Game on, you play " + ( playFirstAI===true ? "second." : "first.") );
};

const playFirstPeerCall = function() {
	if ( document.getElementById("playFirstA").checked === true) {
		$('#playFirstPeer').val("playerA");
	}
	if (document.getElementById("playFirstB").checked === true) {
		$('#playFirstPeer').val("playerB");
	}
	//alert("Game on, you play " + ( playFirstAI===true ? "second." : "first.") );
};

const compAI = function() {
	if ( document.getElementById("computerDumb").checked === true) {
		$('#computerdumb').val("true");
	}
	if (document.getElementById("computerSmart").checked === true) {
		$('#computerdumb').val("false");
	}

};

const playerIceCream = function() {
  //player A chose Ice Cream
  //$('#icHuman').off('click', playerIceCream);
  //$('#cookieAI').on('click', playerCookie);

  $('#player').val("icecream");
  //alert("Ice Cream for Player A! Cookie for Player B.");
  $('#chooseicecream').html("Player A");
  $('#choosecookie').html("Player B");
};

const playerCookie = function() {
  //player A chose Cookie
  //$('#icHuman').on('click', playerIceCream);
  //$('#cookieAI').off('click', playerCookie);

  $('#player').val("cookie");
  //alert("Cookie for Player A! Ice Cream for Player B.")
  $('#chooseicecream').html("Player B");
  $('#choosecookie').html("Player A");
};
