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

  getPointOnLineAwayByDistance(lineLength, point1, point2) {
    const x1 = point1.getX();
    const y1 = point1.getY();

    const x2 = point2.getX();
    const y2 = point2.getY();

    let dis = Math.hypot(x2 - x1, y2 - y1);

    let moving = lineLength;
    let t = moving / dis;

    let xt = (1 - t) * x1 + t * x2;
    let yt = (1 - t) * y1 + t * y2;
    return { xt, yt };
  }

  getLineMiddlePoint(point1, point2) {
    let x1 = point1.getX() + 4;
    let y1 = point1.getY();

    let x2 = point2.getX();
    let y2 = point2.getY();

    let dis = Math.hypot(x2 - x1, y2 - y1) / 2;

    return this.getPointOnLineAwayByDistance(dis, point1, point2);

  }


}

