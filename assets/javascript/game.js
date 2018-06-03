var music = document.createElement('audio');
music.setAttribute('src','assets/sounds/the-game.mp3');
music.volume = .3;
var selectBeeaudio = document.createElement('audio');
selectBeeaudio.setAttribute('src', 'assets/sounds/bumble-bee-intro.mp3');
var selectOptimusaudio = document.createElement('audio');
selectOptimusaudio.setAttribute('src', 'assets/sounds/optimus-intro.mp3');
var selectLaseraudio = document.createElement('audio');
selectLaseraudio.setAttribute('src', 'assets/sounds/laserbeak-intro.mp3');
var selectStealthaudio = document.createElement('audio');
selectStealthaudio.setAttribute('src', 'assets/sounds/stealthbreaker-intro.mp3');

var playButton = document.getElementById("playButton");

var charName = ['Optimus', 'Bumble-Bee', 'Laser-Beak', 'Stealth-Breaker'];
var charHitpoints = [2000, 1850, 1650, 1500];
var charImage = ['optimus.jpg', 'bumblebee.jpg', 'laserbeak.jpg', 'stealthbreaker.jpg'];
var charHit = [200, 185, 165, 150];
var charSpecial = [250, 245, 215, 200];

var userHitpoints; var userAttack; var opponentHitpoints; var opponentAttack;
opponents = 3;
var opponentAttackArray = ['hit', 'spAttack', 'block'];

// header buttons
$('.startButton').on('click', function(){
    $(this).hide();
    $('.alert').remove();
    newGame();

});

$('.restartButton').on('click', function(){
    $('.messages').html(" ");
	if(startPressed = true){
	//removes remaining characters off the board.
	for(var i = 0; i< charName.length; i++){
		$('#' + charName[i]).remove();
	}
	opponents = 3;
	newGame();
	}
});

$('.playButton').on('click', function(){
    $(this).hide();
    music.loop = true;
	music.play();
});

$('.pauseMusic').on('click', function(){
    $('.playButton').show();
    music.pause();
});

function newGame(){
    // creating caracter buttons
    for(var i = 0; i < charName.length; i++){
        var character = $('<button>');
        var characterPic = $('<img>');
        characterPic.attr('src', 'assets/images/' + charImage[i]);
        characterPic.addClass('picStyle');
        character.addClass('startStyle');
        character.attr('id', charName[i]);
        character.attr({'data-hp': charHitpoints[i]});
        character.attr({'data-hit': charHit[i]});
        character.attr({'data-name': charName[i]});
        character.attr({'data-special': charSpecial[i]});
        var hpSpan = $('<span>').addClass('characterHP').html(character.data('hp'));
        character.append(charName[i], characterPic, hpSpan);
        $('.startBtn').append(character);
    }

 $(document).on('click', '.startStyle', function(){
    userHP = $(this).data('hp');
    // moves buttons to 'Your Character'
    $(this).removeClass('charImg startStyle').addClass('userStyle');
    $('.userChar').append($(this));
    // moves other character to 'Characters to Battle'
    for(var i = 0; i < charName.length; i++){
        if(charName[i] != $(this).data('name')){
            $('#' + charName[i]).removeClass('charImg startStyle').addClass('opponentStyle');
            $('#' + charName[i] + 'span').removeClass('characterHP');
            $('.opponentChar').append($('#' + charName[i]));
            }
        }
    chooseOpponent();
});

};


