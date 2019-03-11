/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, roll;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying){
        //1. Random Number
        dice = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random()*6) + 1;

        var total = dice + dice2;

        //2. display the Result 
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        document.querySelector('.secondDice').style.display = 'block';
        document.querySelector('.secondDice').src = 'dice-' + dice2 + '.png'

        //3. Update the round score IF the rolled number was NOT 1
        if (dice !== 1 & dice2 !== 1) {
            if (dice === 6 && roll === 6) {
                document.getElementById('score-'+activePlayer).textContent = 0;
                nextPlayer();
                document.getElementById('currrent-'+activePlayer).textContent = 0;
            }
            roll = dice;
            //Add score
            roundScore += total; //roundScore = roundScore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

    } else {

    };
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying){
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the User Interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Undefined, 0, null or "" are COERCED to false
        //Anything else is true
        var input = document.querySelector('.final-score').value;
        var winningScore;

        if (input){
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER!!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.secondDice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    } else {};
});

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    //Reset score
    scores=[0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    roll = 0;

    document.querySelector('.final-score').textContent = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    //Player 1 like active
    document.querySelector('.player-0-panel').classList.remove('active'); //We remove it first so classes are not duplicated
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    //Remove Name from the winner
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    //hide the dice
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';

    //quitar el estilo alguno sea ganador
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

function nextPlayer(){

     //Next Player
     activePlayer === 0 ? activePlayer =1 : activePlayer=0;
     roundScore = 0;
     roll = 0;
     //Set to cero the values
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';
     
     //Change the actives panel
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
     
     /* 
     We can do it with a if statement with the followuiing classList
     document.querySelector('.player-0-panel').classList.remove('active');
     document.querySelector('.player-0-panel').classList.add('active');
     */

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';
}

/*
1.-setter
document.querySelector('#current-' + activePlayer).textContent = dice;
document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>'

2.-guetter
var score = document.querySelector('#score-0').textContent;

3.- THIS ONLY WORKS FOR ID's
document.getElementById('score-0').textContent = '0'

select id ---> #
select class ---> .

*/