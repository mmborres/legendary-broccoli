//////////////////////////// Custom Page DOM

const playerHuman = function () {
	$('#player').val("icHuman");
	$('#chooseicecream').html("Human Player");
	$('#choosecookie').html("Computer");
};

const playerAI = function () {
	$('#player').val("playerAI");
	$('#chooseicecream').html("Computer");
	$('#choosecookie').html("Human Player");
};

const playFirst = function () {
	if (document.getElementById("alertYes").checked === true) {
		playFirstAI = false;
		$('#playFirstAI').val("false");
	}
	if (document.getElementById("alertNo").checked === true) {
		playFirstAI = true;
		$('#playFirstAI').val("true");
	}
};

const playFirstPeerCall = function () {
	if (document.getElementById("playFirstA").checked === true) {
		$('#playFirstPeer').val("playerA");
	}
	if (document.getElementById("playFirstB").checked === true) {
		$('#playFirstPeer').val("playerB");
	}
};

const compAI = function () {
	if (document.getElementById("computerDumb").checked === true) {
		$('#computerdumb').val("true");
	}
	if (document.getElementById("computerSmart").checked === true) {
		$('#computerdumb').val("false");
	}
};

const playerIceCream = function () {
	$('#player').val("icecream");
	$('#chooseicecream').html("Player A");
	$('#choosecookie').html("Player B");
};

const playerCookie = function () {
	$('#player').val("cookie");
	$('#chooseicecream').html("Player B");
	$('#choosecookie').html("Player A");
};

