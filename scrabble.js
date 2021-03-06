var Scrabble = function() {};

Scrabble.score = function(word) {

  // TO DO:
  // - error for invalid characters

  if ( typeof(word) !== 'string' || word.length > 7 || !/^[a-zA-Z]+$/.test(word) ) return "Invalid word";

  var wordScore = word.length == 7 ? 50 : 0,
      letterValues = {
        A: 1,   B: 3,   C: 3,   D: 2,
        E: 1,   F: 4,   G: 2,   H: 4,
        I: 1,   J: 8,   K: 5,   L: 1,
        M: 3,   N: 1,   O: 1,   P: 3,
        Q: 10,  R: 1,   S: 1,   T: 1,
        U: 1,   V: 4,   W: 4,   X: 8,
        Y: 4,   Z: 10
      };

  for ( i = 0; i < word.length; i++ ) {
    wordScore += letterValues[ word.toUpperCase()[i] ]; }

  return wordScore;
};

Scrabble.highestScoreFrom = function(arrayOfWords) {

  if ( !Array.isArray(arrayOfWords) ) return "Send me an array and we can try this again...";

  var highestScore = 0;
  var winner = undefined;

  arrayOfWords.forEach(function(word) {
    if ( Scrabble.score(word) > highestScore ){
      highestScore = Scrabble.score(word);
      winner = word; }
    else if ( Scrabble.score(word) == highestScore)
      if ( winner.length == 7 || word.length == 7) {
          winner = winner.length <= word.length ? word : winner; }
      else {
        winner = word.length <= winner.length ? winner : word; }
  });

  return winner;
};

var Player = function(name) {
    this.name = name;
    this.plays = [];
};

Player.prototype.play = function(word) {
  if ( this.hasWon() ) return false;
  this.plays.push(word);
  return this.name + " played " + word + ".";
};

Player.prototype.totalScore = function() {
  var total = 0;

  this.plays.forEach(function(word) {
    total += Scrabble.score(word);
  });

  return total;
};

Player.prototype.hasWon = function() {
  var won = this.totalScore() < 100 ? false : true;
  return won;
};

Player.prototype.highestScoringWord = function() {
  return Scrabble.highestScoreFrom(this.plays);
};

Player.prototype.highestWordScore = function() {
  return Scrabble.score( this.highestScoringWord() );
};



var myPlayer = new Player("Mario");
console.log(myPlayer.play("hippie") + " : " + Scrabble.score("hippie"));
console.log(myPlayer.play("hotdog") + " : " + Scrabble.score("hotdog"));
console.log(myPlayer.play("cat") + " : " + Scrabble.score("cat"));
console.log(myPlayer.play("zzzzzz") + " : " + Scrabble.score("zzzzzz"));
console.log(myPlayer.play("unicorn") + " : " + Scrabble.score("unicorn"));
console.log(myPlayer.plays);

console.log(Scrabble.score("tree8"));
console.log(myPlayer.totalScore());
console.log(myPlayer.hasWon());
console.log(myPlayer.highestScoringWord());
console.log(myPlayer.highestWordScore());
console.log(Scrabble.highestScoreFrom(["cat", "dog", "hippo"]));

module.exports = Scrabble;
