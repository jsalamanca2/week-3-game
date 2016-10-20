var hang = {
  words: ["superman","star wars","indiana jones","jurrasic park","jaws","catch me if you can","schindlers list",],
  wrong: [],
  wins: 0,

  pickWord: function() {
    return [Math.floor(Math.random()*this.words.length)];
  },

  printWrong: function() {
    document.querySelector("#used").innerHTML = this.wrong.toString();
  },

  writeWins: function() {
    var win= "<p>Wins: "+this.wins+"</p>";
    document.querySelector("#wins").innerHTML = win;
  },
};
// I'm trying to write out all processes to make sure I did'nt forget anything. Had alot of help the video tutorials
// and alos console.logging a bunch of stuff. 

//Sets toWin to 0. For every correct letter guessed add 1 to toWin. Once toWin = randomWord.length then the player wins
var toWin = 0;

//first variable calls the function pickWord to get a random index # from hang.words   The 2nd variable randomWord is set equal to the string value of randomIndex
var randomIndex = hang.pickWord();
var randomWord = hang.words[randomIndex];

//Sets the number of guesses to twice the length of the word to be guessed
var guesses = randomWord.length*2;

//Displays the amount of guesses left
var guessLeft = "<p>You have "+guesses+" guesses left</p>";
document.querySelector("#guess").innerHTML = guessLeft;

//Creates blank spaces equal to the length of the random word chosen.
function createSpaces() {
  var spaces = "";
  for (var i=0;i<randomWord.length; i++) {
    spaces += "<p class='spaces'>_</p>";
    document.querySelector("#word").innerHTML = spaces;
  }
}

//makes variable userGuess global
document.onkeyup = function(event){
  var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
  console.log(userGuess);
};

//Replaces underscores with properly guessed letters
function updateSpaces() {
  for (var i=0; i<randomWord.length; i++){
   if(userGuess === randomWord[i]) {
     var fill = document.getElementsByClassName('spaces');
     fill[i+1].innerHTML=userGuess;
     toWin++;
     console.log(toWin);
   }
  }
}

//function resets the game when the user loses or wins
function resetGame() {
  hang.pickWord();
  randomIndex = hang.pickWord();
  randomWord = hang.words[randomIndex];
  toWin= 0;
  hang.wrong = [];
  hang.printWrong();
  guesses = randomWord.length*2;
  guessLeft = "<p>You have "+guesses+" guesses left! DON'T BLOW IT!</p>";
  document.querySelector("#guess").innerHTML = guessLeft;
  createSpaces();
}

//calls the createSpaces function to create underscores under the lenght of the word.
createSpaces();

//the user starts with 0 wins
hang.writeWins();

//function to be ran for every players choices
document.onkeyup = function(event) {
    userGuess = String.fromCharCode(event.keyCode).toLowerCase();

    //if the players guess is part of the randomWord
    if(randomWord.indexOf(userGuess) !== -1 && hang.wrong.indexOf(userGuess) ===-1){
      console.log("Letter Contained");
      console.log(toWin);
      updateSpaces();
    }

    //if the player chooses a letter that is not part of the word
    else {
      console.log("Letter not Contained");
      guesses--;
      guessLeft = "<p>You have "+guesses+" guesses left</p>";
      document.querySelector("#guess").innerHTML = guessLeft;
      console.log(guesses);
      hang.wrong.push(userGuess);
      console.log(hang.wrong);
      hang.printWrong();
      }

      //if the user runs out of guesses alert them they've lost
      if( guesses === 0) {
        alert("Sorry not sorry bud, you just failed. So try again.");
        resetGame();
      }

      //if the user guesses the word then add 1 to wins and reset the game
      if( toWin === randomWord.length) {
        hang.wins++;
        hang.writeWins();
        alert("You guessed '"+randomWord+"' correctly. Celebrate!");
        resetGame();
      }
};
console.log(randomWord);
console.log(guesses);
