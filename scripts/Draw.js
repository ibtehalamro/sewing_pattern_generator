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

  drawCircleAtPoint(point ,r,color){
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", point.getX());
    circle.setAttribute("cy", point.getY());
    circle.setAttribute("r", r);
    circle.setAttribute("fill",color);
    
   
  return circle; }

}

