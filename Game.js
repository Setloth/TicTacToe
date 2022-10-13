import Row from "./Row.js"

class Game {
  constructor(s = 3, placers = { first: "x", second: "o" }) {
    this.board = []
    for (var i = 0; i < s; i++) {
      this.board.push(new Row(s))
    }
    this.placers = placers
    this.size = s

  }
  isComplete() {
    if (!this.isFull()) return false
    else {
      var winner = this.checkWinner()
      return (winner != null ? true : false)
    }
  }
  isFull() {
    for (var row of this.board) {
      if (!row.isFull()) return false
    }
    return true
  }
  generate() {
    this.board.forEach(async row => {
      var p = this.placers.first

      const r = async () => {
        if (row.isFull()) return;
        var b = Math.floor(this.size * Math.random())

        if (row.boxes[b] == null) row.setBox(b, p)

        p = (p == this.placers.first ? this.placers.second : this.placers.first)
        r()
      }
      await r()


    })
  }

  checkWinner() {
    /*
    Cases:
      1) Going across: 
        x x x
      2) Going vertically:
        x
        x
        x
      3) Going diag:
        x
          x
            x
      4) Going diag backwards:
            x
          x
        x

    Arising issue: what if game is labeled full, but the result is that both sides win?
    Possible solution: check winner in isFull() to know if game is over before board is full. 
    */

    var v = (b) => (b.mark == this.placers.first ? 1 : -1)

    //check across for each row
    for (var row of this.board) {
      var rSum = 0;
      for (var i = 0; i < row.size; i++) {
        rSum += v(row.boxes[i])
      }
      if (rSum >= this.size) return this.placers.first
      else if (rSum <= -this.size) return this.placers.second
    }

    for (var i = 0; i < this.size; i++) {
      var cSum = 0
      for (var row of this.board) {
        cSum += v(row.boxes[i])
      }
      if (cSum >= this.size) return this.placers.first
      else if (cSum <= -this.size) return this.placers.second
    }


    var cSumF = v(this.board[0].boxes[0]) + v(this.board[1].boxes[1]) + v(this.board[2].boxes[2])
    if (cSumF >= this.size) return this.placers.first
    else if (cSumF <= -this.size) return this.placers.second

    var cSumB = v(this.board[2].boxes[0]) + v(this.board[1].boxes[1]) + v(this.board[0].boxes[2])
    if (cSumB >= this.size) return this.placers.first
    else if (cSumB <= -this.size) return this.placers.second

  }
}


export default Game