
var charName = ['Optimus', 'Bumble-Bee', 'Laser-Beak', 'Stealth-Breaker'];
var charHP = [600, 400, 480, 320];
var charHit = [8, 20, 16, 28];
var charImg = ['optimus.jpg', 'bumblebee.jpg', 'laserbeak.jpg', 'stealthbreaker.jpg'];
var charSpecial = [12, 20, 16, 32];

var userHitpoints; 
var userAttack; 
var opponentHitpoints; 
var opponentAttack;
var userChar;
var opponentChar;
var battleMode = false;


newGame();

function newGame(){
    //Creating buttons
    for(var i = 0; i < charName.length; i++){
        var character = $('<button>');
        var characterPic = $('<img>'); 
        characterPic.attr('src', 'assets/images/' + charImg[i]);
        characterPic.addClass('picStyle');
        character.addClass('startStyle');
        character.attr('id', charName[i]);
        character.attr({'data-hp': charHP[i]});
        character.attr({'data-hit': charHit[i]});
        character.attr({'data-name': charName[i]});
        character.attr({'data-special': charSpecial[i]});
        var hpSpan = $('<span>').addClass('characterHP').html(character.data('hp'));
        character.append(charName[i], characterPic, hpSpan);
        $('.startBtn').append(character);
    }
    
    $(document).on('click', '.startStyle',function(){
        userHP = $(this).data('hp');
        console.log(userHP);
        //Moves Button to 'Your Character'
        $(this).removeClass('charImg startStyle').addClass('userStyle');
        $('.userChar').append($(this));
        //Moves other to 'Characters to Battle'
        for(var i = 0; i < charName.length; i++){
            if(charName[i] != $(this).data('name')){
                $('#'+charName[i]).removeClass('charImg startStyle').addClass('opponentStyle');
                $('#'+charName[i]+ ' span').removeClass('characterHP');
                $('.opponentChar').append($('#'+charName[i]));
            }
        }
        chooseOpponent();
    });
    }
    
    function chooseOpponent(){
        $('.messages').html(' ');
    //clicking opponents sends them to battleMode function. 
        $(document).on('click', '.opponentStyle', function(){
            opponentHP = $(this).data('hp');
            console.log(opponentHP);
            $(this).removeClass('opponentSyle opponentChar').addClass('currentOpponent');
            $(this).children('span').attr('class','enemigoHP');
            $('.chosenOpponent').append($(this));
            //Turns off click for other opponent so that only chosenOpponent appears
            for(var i = 0; i < charName.length; i++){
                if(charName[i] != $(this).data('name')){
                    $(document).off('click','.opponentStyle');
                }
            }
            battleMode();
        });
    }
     
function updateDisplay() {
        $('.userChar .character-attack').text("Attack: " + userAttack);
        $('.userChar .character-hp').text("HP: " + userHitpoints);
        $('.choosenOpponent .character-hp').text("HP: " + opponentHitpoints);
        $('.messages').html('<p>You took ' + opponentAttack + ' damage.</p><p>' + character[opponentChar].name + ' took ' + (userAttack-character[userChar].attack) + ' damage.</p>');
    }

function winLoss() {
    if (userHitpoints <= 0) {
        $('#attack-button').prop('disabled', true);
        $('.messages').append('<p>You were defeated!!! Press "Restart" to play again.</p>');
        $('.restartButton').hide();
    }
    else if (opponentHitpoints <= 0){
        $('.current-enemy').remove();
        battleMode = false;
        opponentsLeft--;
        if (opponentsLeft == 0) {
            $('.messages').append('<p>You defeated all of your enemies!!! You Win!!! Press "Restart" to play again.</p>');
            $('.resartButton').show();
        }
    
    }
}

$(document).ready(function() {
    newGame();

    $('.startBtn').on('click', '.character-button', function() {
        userChar = parseInt($(this).attr('data-index'));
        userHitpoints = character[userChar].hp;
        userAttack = character[userChar].attack;

        var userDiv = $('div[data-index=' + userChar + ']');
        userDiv.attr('class', 'character-info user-character');
        $(userDiv).detach().prependTo('.userChar');

        for (var i = 0; i < character.length; i++) {
            if (i !== userChar) {
                var currentDiv = $('div[data-index=' + i + ']');
                currentDiv.attr('class', 'character-info enemy-character');
                $(currentDiv).detach().appendTo('.opponentChar');
                $('div[data-index=' + i +'] .character-stats .character-attack').text('Attack: ' + character[i].counter);
            }
        }

        $('.startBtn').attr('class', 'hidden');

    });

    $('.opponentChar').on('click', '.enemy-character', function() {
        if (!battleMode) {
            opponentChar = parseInt($(this).attr('data-index'));
            opponentHitpoints = character[opponentChar].hp;
            opponentAttack = character[opponentChar].counter;

            var enemyDiv = $('div[data-index=' + opponentChar + ']');
            enemyDiv.attr('class', 'character-info enemy-character current-enemy');
            $(enemyDiv).detach().prependTo('.chosenOpponent');
            battleMode = true;
            $('.messages').empty();
        }
    });

    $('#attack-button').on('click', function() {
        if (battleMode) {
            userHitpoints -= opponentAttack;
            opponentHitpoints -= userAttack;
            userAttack += character[userChar].attack;
            updateDisplay();
            winLoss();
        }
    });

    $('.header-buttons').on('click', '.restartButton', function() {
        userHitpoints = null;
        userAttack = null;
        opponentHitpoints = null;
        opponentAttack = null;
        userChar = null;
        opponentChar = null;
        opponentsLeft = character.length-1;
        battleMode = false;
        $('.player-character').remove();
        $('.enemy-character').remove();
        $('.messages').text('');

        newGame();
    });

});