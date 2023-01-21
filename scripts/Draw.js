export class Draw {
  constructor() {
    //constructor
  }

  drawGrid() {
    let m = "";
    for (let i = 0; i <= 100; i++) {
      m += `M ${0} ${i} L ${100} ${i} `;
      m += " ";
    }
    for (let i = 0; i <= 100; i++) {
      m += `M ${i} ${0} L ${i} ${100}`;
      m += " ";
    }
    return m;
  }

}

