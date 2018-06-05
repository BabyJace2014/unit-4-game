var music = document.createElement('audio');
music.setAttribute('src','assets/sounds/the-game.mp3');
music.volume = .3;


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
    userHitpoints = $(this).data('hp');
    // moves button to 'Your Character'
    $(this).removeClass('charImage startStyle').addClass('userStyle');
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
}

function chooseOpponent(){
    $('.messages').html(" ");
    // clicking opponent starts the battleMode fucntion
    $(document).on('click', '.opponentStyle', function(){
        opponentHitpoints = $(this).data('hp');
        console.log(opponentHitpoints);
        $(this).removeClass('opponentStyle opponentChar').addClass('currentOpponent');
        $(this).children('span').attr('class', 'enemigoHP');
        $('.chosenOpponent').append($(this));
        // turns off click for other opponent so that only chosenOpponent appears
       for(var i = 0; i < charName.length; i++){
            if(charName[i] != $(this).data('name')){
                $(document).off('click', '.opponentStyle');
            }
        }
        battleMode();
    });
}

function generateOpponentAttack(){
    var randomAttack = opponentAttackArray[Math.floor(Math.random() * 2)];
        if(randomAttack === 'hit'){
            opponentAttack = $('.currentOpponent').data('hit');
        }
        if(randomAttack === 'spAttack'){
            opponentAttack = $('.currentOpponent').data('special');
        }
        if(randomAttack === 'block'){
            opponentAttack = 'block';
        }
   // console.log(randomAttack);
   // console.log(opponentAttack);
}

function battleMode(){
    $('.hit').on('click', function(){
        generateOpponentAttack();
        userAttack = $('.userStyle').data('hit');
        if(opponentAttack === 'block'){
           userHitpoints = parseInt(userHitpoints - userAttack);
            displayHP();
        }
        else{
            opponentHitpoints = parseInt(opponentHitpoints - userAttack);
            userHitpoints = parseInt(userHitpoints - opponentAttack);
            displayHP();
        }
      //  console.log(userHitpoints + " " + opponentHitpoints);
        winOrlose();
    });

    $('.spAttack').on('click', function(){
        generateOpponentAttack();
        userAttack = $('.userStyle').data('special');
        if(opponentAttack === 'block'){
            userHitpoints = parseInt(userHitpoints - userAttack);
            displayHP();
        }
        else{
            opponentHitpoints = parseInt(opponentHitpoints - userAttack);
            userHitpoints = parseInt(userHitpoints - opponentAttack);
            displayHP();
        }
       // console.log(userHitpoints + " " + opponentHitpoints);
        winOrlose();
    });

    $('.block').on('click', function(){
        generateOpponentAttack();
        // if both characters block, nothing happens
        if(opponentAttack === 'block'){
            userHitpoints = userHitpoints;
            opponentHitpoints = opponentHitpoints;
            displayHP();
        }
        else{
            opponentHitpoints = parseInt(opponentHitpoints - opponentAttack);
            displayHP();
        }
     //   console.log(userHitpoints + " " + opponentHitpoints);
        winOrlose();
    });
}

function winOrlose(){
    if(opponentHitpoints <= 0 && (opponents != 0)){
        music.play();
        $('.messages').html("You have defeated your opponent! Click another caracter to continue the battle!");
        var enemy = $('.currentOpponent').data('name');
        $('#' + enemy).remove();
         chooseOpponent();
        opponents --;
        console.log(opponents);
    }
    if((opponentHitpoints <= 0) && (opponents == 0)){
        $('.messages').html("Congratulations!!! You have defeated all of your opponents and Won the game!  Press 'Restart' to start a new game.");
    }
    if(userHitpoints <= 0){
        $('.messgaes').html("You have been defeated....Game Over!!! Press 'Restart' to start a new game.");
    }
    
}

function displayHP(){
    $('.currentOpponent').data('hp', opponentHitpoints);
    $('.currentOpponent span').html(opponentHitpoints);
    $('.userStyle').data('hp', userHitpoints);
    $('.userChar span').html(userHitpoints);
}



