var inquirer = require("inquirer");
var playerArray = [];

class Player {
    constructor(name,position,offense,defense) {
        this.name = name;
        this.position = position;
        this.offense = offense;
        this.defense = defense;
    }

    goodGame(coinflip) {
        if(coinflip) {
            this.offense++;
        }
        else {
            this.defense++;
        }
    }

    badGame(coinflip) {
        if(coinflip) {
            this.offense--;
        }
        else {
            this.defense--;
        }        
    }
    printStats() {
        console.log("Name:",this.name,"\nPosition:",this.position,"\nOffensive Value:",this.offense,"\nDefense:",this.defense);
        playGame();
    }

}
function askQuestion (count) {
    console.log("ask question.");
    if (count < 3) {
        inquirer.prompt([
        {
            name: "name",
            message: "What is the player name?"
        }, {
            name: "position",
            message: "What is your current position?"
        }, {
            name: "offense",
            message: "What is their offensive value?"
        }, {
            name: "defense",
            message: "What is their defensive value?"
        }
        ]).then(function(answers) {
            // initializes the variable newProgrammer to be a programmer object which will
            // take in all of the user's answers to the questions above
            var player = new Player(
                answers.name,
                answers.position,
                answers.offense,
                answers.defense);
            // pushes newProgrammer object into our array
            console.log(answers);
            playerArray.push(player);
            // add one to count to increment our recursive loop by one
            count--;
            // run the askquestion function again so as to either end the loop or ask the questions again
            askQuestion();
        });
        // else statement which runs a for loop that will execute .printInfo() for each object inside of our array
    }
    else {
        for (var x = 0; x < playerArray.length; x++) {
            playerArray[x].printStats();
        }
    }
    
};   

function substitute () {
    inquirer.prompt([
    {
        name: "change",
        message: "Would you like to switch a players? (y or n)"
    }
    ]).then(function (answers) {
        if(answers.name.toLowerCase() ==="y") {
            inquirer
            .prompt([
                {
                    name:"sub",
                    message: "Do you want to substitute player 1 or 2 (1 or 2 if subbing)"
                }
            ]).then(function(answers) {
                console.log("hi");

            });
        }
    });
    count--;
    playGame(count);
}

function playGame() {
    //initialize game vars
    var offensiveTotal; 
    var defensiveTotal; 
    var score = 0;
    console.log("hello im playing game");

    while(count>0) {    //we are going to play 5 rounds
        console.log("count, ",count);
        offensiveTotal = defensiveTotal = 0;
        var opponentDefense = Math.floor(Math.random()*20)+1;
        var opponentOffense = Math.floor(Math.random()*20)+1;

        for(var x=0; x<playerArray.length-1;x++) {
            offensiveTotal += parseInt(playerArray[x].offense);
            defensiveTotal += parseInt(playerArray[x].defense);
        }
        // console.log("team offense, ",offensiveTotal,"team defense, ",defensiveTotal);
        if(offensiveTotal > opponentDefense) {
            console.log("we scored a point");
            score++;
        }
        if( defensiveTotal < opponentOffense ) {
            console.log("we lost a point");
            if(score > 0)
                score--;
        }
        console.log("score ",score);
        substitute();
    }
};

askQuestion(3);