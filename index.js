
var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

var place = (n) => {
    var r = Math.floor(Math.random() * 3)
    var s = Math.floor(Math.random() * 3)

    if (!!board[r][s]) return place(n)
    board[r][s] = n
}

var R = { x: 1, o: -1 }
var n = R.x
var r = () => {
    if (full() || !!winner()) return
    place(n)
    n = (n == R.x ? R.o : R.x)
    r()
}

var full = () => {
    for (var r = 0; r < 3; r++) {
        for (var s = 0; s < 3; s++) {
            if (!board[s][r]) return false
        }
    }
    return true
}

var winner = () => {
    for (var r = 0; r < 3; r++) {
        var rSum = 0
        for (var s = 0; s < 3; s++) {
            rSum += board[r][s] || 0
        }
        if (rSum == 3) return R.x
        else if (rSum == -3) return R.o
    }
    for (var s = 0; s < 3; s++) {
        var cSum = 0
        for (var r = 0; r < 3; r++) {
            cSum += board[r][s] || 0
        }
        if (cSum == 3) return R.x
        else if (rSum == -3) return R.o
    }

    var cSumF = (board[0][0] || 0) + (board[1][1] || 0) + (board[2][2] || 0)
    if (cSumF == 3) return R.x
    else if (cSumF == -3) return R.o

    var cSumB = (board[2][0] || 0) + (board[1][1] || 0) + (board[0][2] || 0)
    if (cSumB == 3) return R.x
    else if (cSumB == -3) return R.o
}

var total = 0
var x = 0
var o = 0
var tie = 0

var rr = () => {
    r()

    var w = winner()

    console.log(!!w ? Object.keys(R).find(key => R[key] === w) : "tie")

    if (w == -1) o++
    if (w == 1) x++
    else if (!w) tie++

    total++

     board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

    if (total < 500) rr()
    // console.log(board.map(r => r.map(s => Object.keys(R).find(key => R[key] === s)).join("")).join("\n"))
}

rr()

console.log("X:", x, "(", (x / total) * 100, "%)\nO:", o, "(", (o / total) * 100, "%)\nTie:", tie, "(", (tie / total) * 100, "%)\n\nTotal:", total)