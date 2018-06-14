var music = document.createElement('audio');
music.setAttribute('src', 'assets/sounds/the-game.mp3');
music.volume=.3;

var charName = ['Optimus','Bumble-Bee', 'Laser-Beak', 'Stealth-Breaker'];
var charHP = [600, 400, 480, 320];
var charImg = ['optimus.jpg','bumblebee.jpg', 'laserbeak.jpg', 'stealthbreaker.jpg'];
var charAtk = [8, 20, 16, 28];
var charSpecial = [12, 20, 16, 32];

var userHP; 
var userAtk; 
var opponentHP; 
var opponentAtk;
var userChar;
var opponentChar;
var opponentsLeft = 3;


// headerButtons
$('.startButton').on('click', function(){
    newGame();
    $(this).hide('click');
    
});

$('.restartButton').on('click', function(){
    newGame();
});

$('.playButton').on('click', function(){
    music.play();
    $(this).hide('click');
});

$('.pauseMusic').on('click', function(){
    music.pause();
    $('.playButton').show();
});



function newGame(){
    // creating caracter buttons
    for(var i = 0; i < charName.length; i++){
        var character = $('<button>');
        var characterPic = $('<img>');
        characterPic.attr('src', 'assets/images/' + charImg[i]);
        characterPic.addClass('picStyle');
        character.addClass('startStyle');
        character.attr('id', charName[i]);
        character.attr({'data-hp': charHP[i]});
        character.attr({'data-atk': charAtk[i]});
        character.attr({'data-name': charName[i]});
        character.attr({'data-special': charSpecial[i]});
        var hpSpan = $('<span>').addClass('characterHP').html(character.data('hp'));
        character.append(charName[i], characterPic, hpSpan);
        $('.startBtn').append(character);
        $('.messages').html("CHOOSE YOUR CHARACTER");
    }

    // choose user character
    $(document).on('click', '.startStyle', function() {
        userHP = $(this).data('hp');
        // moves button to "Your Character"
        $(this).removeClass('charImg startStyle').addClass('userStyle');
        $('.userChar').append($(this));
        // moves other to "Characters to Battle"
        for(var i = 0; i < charName.length; i++){
            if(charName[i] != $(this).data('name')){
                $('#' + charName[i]).removeClass('charImg startStyle').addClass('opponentStyle');
                $('#' + charName[i] + ' span').removeClass('characterHP');
                $('.opponentChar').append($('#' + charName[i]));
            }
        }
        chooseOpponent();
    });    

}

function chooseOpponent() {
    $('.messages').html("CHOOSE OPPONENT TO BATTLE");
    $(document).on('click', '.opponentStyle', function(){
        opponentHP = $(this).data('hp');
        $(this).removeClass('opponentStyle opponentChar').addClass('currentOpponent');
        $(this).children('span').attr('class', 'enemigoHP');
        $('.chosenOpponent').append($(this));
        $('.messages').html('');
        // turns off click function for other opponents
        for(var i = 0; i < charName.length; i++){
            if(charName[i] != $(this).data('name')){
                $(document).off('click', '.opponentStyle');
            }
        }
   battleMode();
    });
}

function updateDisplay() {
        $('.currentOpponent').data('hp', opponentHP);
        $('.currentOpponent span').html(opponentHP);
        $('.userStyle').data('hp', userHP);
        $('.characterHP span').html(userHP);
    }

 function battleMode() {
    $('#attack-button').on('click', function() {
           userAtk = $('.userStyle').data('atk');
           opponentHP = parseInt(opponentHP - userAtk);
           opponentAtk = $('.opponentStyle').data('atk');
           userHP = parseInt(userHP - opponentAtk);
            updateDisplay();
            winLoss();
    });

}

function winLoss() {
    if ((opponentHP <= 0) && (opponentsLeft == 0)) {
        $('.messages').html("Congratulations!!! You have defeated all of your opponents. Press 'Restart' to play again.");
    }
    else if (opponentHP <= 0) {
        var enemy = $('.currentOpponent').data('name');
        $('#' + enemy).remove();
        opponentsLeft--;
        chooseOpponent();
        console.log(opponentsLeft);
    }
    
        if (userHP == 0) {
            $('.messages').html("You lost. Game Over!. Press 'Restart to play again.");
            $('.resartButton').show();
        }
    
    }
