export class Line {
  point1;
  point2;

  constructor(point1, point2) {
    this.point1 = point1;
    this.point2 = point2;
  }

  get point1() {
    return this.point1;
  }

  get point2() {
    return this.point2;
  }

  draw(svgId, strokeWidth=1) {
    let svg = document.getElementById(svgId);
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", this.point1.getX());
    line.setAttribute("y1", this.point1.getY());
    line.setAttribute("x2", this.point2.getX());
    line.setAttribute("y2", this.point2.getY());
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", strokeWidth);
    svg.appendChild(line);
  }

  toString() {
    return (
      this.point1.x +
      " " +
      this.point1.y +
      "," +
      this.point2.x +
      " " +
      this.point2.y
    );
  }
}
