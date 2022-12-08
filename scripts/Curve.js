export class Curve {
    constructor() {
        //constructor
      }
     
 generatePath(points, relative)
 {
     let type = null;
 
     if(points.length === 3)
     {
         type = "Q";
     }
     else if(points.length === 4)
     {
         type = "C";
     }
     else if(points.length % 2 === 0)
     {
         type = "C";
     }
     else
     {
         throw 'Number of points must be 3 or an even number more than 3';
     }
 
     const pathPoints = ["M ", points[0][0], ",", points[0][1], type];
 
     for(let p = 1, l = points.length; p < l; p++)
     {
         if(p >= 4 && p % 2 === 0)
             pathPoints.push("S");
 
         pathPoints.push(points[p][0]);
         pathPoints.push(",");
         pathPoints.push(points[p][1]);
     }
 
     return pathPoints.join(" ");
 }
 
 threePointCurveFromPointsArray(points)
 {
     // const points = [[50,50],[150,550],[750,50]];
     const pathString = this.generatePath(points, false);
    
     document.getElementById("neckLine").setAttribute("d", pathString);
    //  this.drawPoints(points, "#2596be");
 }
 
  fourPointCurveFromPointsArray(points)
 {
     // const points = [[0,0],[30,10],[50,30],[80,100]];
     const pathString = this.generatePath(points, false);
   
     document.getElementById("armhole").setAttribute("d", pathString);
    //   this.drawPoints(points, "#2596be");
 }
 
 
 
 drawPoints(points, colour)
 {
     for(const point of points)
     {
         const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
 
         circle.setAttributeNS(null, "cx", point[0]);
         circle.setAttributeNS(null, "cy", point[1]);
         circle.setAttributeNS(null, "r", .5);
 
         circle.setAttributeNS(null, "fill", colour);
 
         document.getElementById("svg").appendChild(circle);
     }
 }
 
}