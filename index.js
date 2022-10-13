import Game from "./Game.js"

var game = new Game();

var counts = {
  x: 0,
  o: 0,
  tie: 0,
  total: 0
}

var r = () => {
  game.generate()

  var w = game.checkWinner()
  if (w == null) w = "tie"

  counts[w]+=1
  counts.total += 1

  
  game = new Game();
  
}

for (var i = 0; i < 500; i++) {
  r()  
}
  
  console.log("X: %i (%i%)\nO: %i (%i%)\nTie: %i (%i%)\n\n%i Trials", counts.x, (counts.x/counts.total)*100, counts.o, (counts.o/counts.total)*100, counts.tie, (counts.tie/counts.total)*100, counts.total )