import Box from "./Box.js"

export default class Row {
  constructor(s=3) {
    this.boxes = [] // init empty
    for (var i = 0; i < s; i++) {
      this.boxes.push(null)
    }
    this.size = s
  }

  isFull() {
    for (var box of this.boxes) {
      if (box == null) return false
    }
    return true
  }
  setBox(index, p) { 
    this.boxes[index]=new Box(p)
  }
}