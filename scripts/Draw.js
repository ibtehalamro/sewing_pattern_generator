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

  lineLength(point1, point2) {
    let xDiff = point2.getX() - point1.getX();
    let yDiff = point2.getY() - point1.getY();
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }
  perpendicularPoint(x1, y1, x2, y2, distance) {
    let slope = (y2 - y1) / (x2 - x1);
    let perpSlope = -1 / slope;
    let perpX = x1 + distance * Math.cos(Math.atan(perpSlope));
    let perpY = y1 + distance * Math.sin(Math.atan(perpSlope));
    return { xt: perpX, yt: perpY };
  }


  // perpendicularPointOnLine(point1 , point2 , distance) {
  perpendicularPointOnLine(point1, point2, distance) {
    let slope = (point2.getY() - point1.getY()) / (point2.getX() - point1.getX());
    let perpSlope = -1 / slope;
    let perpX = point2.getX() + distance / Math.sqrt(1 + perpSlope * perpSlope);
    let perpY = point2.getY() + perpSlope * (perpX - point2.getX());
    return { xt: perpX, yt: perpY };
  }

  
  drawSleeveCurve(points) {
    console.log('points', points)
    let pathString = "M " + points.points[0] + " " + points.points[0] + " C ";
    for (let i = 1; i < points.points.length; i++) {
      pathString += points.points[i][0] + " " + points.points[i][1] + " ";
    }
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathString);
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", .3);

    document.getElementById("svg").innerHTML = "";
    console.log('path', path)
    document.getElementById("svg").appendChild(path);
  }
}

