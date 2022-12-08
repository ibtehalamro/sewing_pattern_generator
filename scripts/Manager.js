import { Draw } from "./Draw.js";
import { SVGDownloadHandler } from "./Buttons.js";
import { Pattern } from "./Pattern.js";
import { Point } from "./Point.js";
import { Line } from "./Line.js";
import { Curve } from "./Curve.js";
let neckCirc = 0;
let shoulderWidth = 0;
let armHoleCirc = 0;
let bustWidth = 0;
let waistToShoulderLength = 0;
let waistToShoulderLengthBack = 0;
let waistCirc = 0;
let bustSpan = 0;
let bustDepth = 0;
(() => {
  resetSvg();
  entryPoint();
  manageButtons();
})();

function entryPoint() {
  drawGrid();
}

function resetSvg() {
  document.getElementById("neckLine").setAttribute("d", "");
  document.getElementById("armhole").setAttribute("d", "");
  document.getElementById("polyLine").setAttribute("points", "");

  // let paths = document.querySelectorAll("path");
  // for (let i = 0; i < paths.length; ++i) {
  //   paths[i].setAttribute("stroke-width", "0.07");
  // }
}

function drawGrid() {
  let m = new Draw().drawGrid();
  document.getElementById("grid").setAttribute("d", m);
}

function manageButtons() {
  document
    .querySelector("#downloadSVG")
    .addEventListener("click", () => SVGDownloadHandler());
  document
    .querySelector("#generate_front_bodice")
    .addEventListener("click", () => generateFrontBodicePattern());
  document
    .querySelector("#generate_back_bodice")
    .addEventListener("click", () => generateBackBodicePattern());
}

function getMeasurements() {
  neckCirc = parseFloat(document.querySelector("#neck_circ").value);
  shoulderWidth = parseFloat(document.querySelector("#shoulder_width").value);
  armHoleCirc = parseFloat(document.querySelector("#armhole_circ").value);
  bustWidth = parseFloat(document.querySelector("#bust_circ").value);
  waistToShoulderLength = parseFloat(document.querySelector("#shoulder_to_waist").value);
  waistToShoulderLengthBack = parseFloat(document.querySelector("#shoulder_to_waist_back").value);
  waistCirc = parseFloat(document.querySelector("#waist_circ").value);
  bustSpan = parseFloat(document.querySelector("#bust_span").value);
  bustDepth = parseFloat(document.querySelector("#bust_depth").value);
}

function generateFrontBodicePattern() {
  resetSvg();
  //not all points will be added to the pattern just the ones that will drawn
  getMeasurements();
  const point1 = new Point(0, 0);
  const point2 = new Point(point1.getX() + getNeckWidth(), point1.getY());
  const point3 = new Point(point1.getX() + getShoulderWidth(), point1.getY());
  const point4 = new Point(point3.getX(), point3.getY() + getShoulderSlope());
  const point5 = new Point(point4.getX(), point4.getY() + getArmHoleHeight());
  const point6 = new Point(
    point4.getX() - 2,
    point4.getY() + getArmHoleHeight() / 2
  );
  const point7 = new Point(getBustWidth(), point5.getY());
  const point8 = new Point(point1.getX(), waistToShoulderLength);
  const point9 = new Point(getWaistWidth(), point8.getY());
  const point10 = new Point(point1.getX(), point1.getY()  +getNeckWidth() + 1);
  const point11 = new Point(point2.getX(), point10.getY());
  const point12 = new Point(bustSpan, waistToShoulderLength);
  const point13 = getIntersectPoint();
  const point14 = new Point( bustSpan , point13.getY()+2.5);
  const point15 = getMiddlePoint(point7 , point9);//middle point
  const point16 = getPointAwayOnLine(point13, point15);
  const point17 = getPointAwayOnLine(point15, point7);
  const point18 = getPointAwayOnLine(point17, point7);

  const shoulderLine = new Line(point2, point4);
  const upperArmholeLine = new Line(point4, point6);
  const lowerArmholeLine = new Line(point6, point7);
  const armpitToWaistLine = new Line(point7, point9);
  const waistLine = new Line(point9, point8);
  const centerFrontLine = new Line(point8, point10);
  const neckLineLowerLine = new Line(point10, point11);
  const neckLineVerticalLine = new Line(point11, point2);
  const bustDepthLine = new Line(point10, point13);
  const frontDartLine = new Line(point12, point13);
  const frontDartLeftLegLine = new Line(point14, new Point(point12.getX()-1.5,point12.getY()));
  const frontDartRightLegLine = new Line(point14, new Point(point12.getX()+1.5,point12.getY()));
  const sideDartLowerLine = new Line(point13, point15);
  const sideDartMiddlePoint = new Line(point16 , point17);
  const sideDartUpperPoint = new Line(point16 , point18);


  const pattern = new Pattern(neckLineLowerLine);
  pattern.addLine(neckLineVerticalLine);
  pattern.addLine(shoulderLine);

  pattern.addLine(upperArmholeLine);
  pattern.addLine(lowerArmholeLine);
  pattern.addLine(armpitToWaistLine);
  pattern.addLine(waistLine);
  pattern.addLine(centerFrontLine);

  pattern.addLine(bustDepthLine);
  pattern.addLine(frontDartLine);
  pattern.addLine(frontDartLeftLegLine);
  pattern.addLine(frontDartRightLegLine);
  pattern.addLine(sideDartLowerLine); 
  pattern.addLine(sideDartMiddlePoint);
  pattern.addLine(sideDartUpperPoint);

  const lines = pattern.getLines();
  let pointsString = lines.join(" , ");
  console.log(pointsString);
  document.querySelector("#polyLine").setAttribute("points", pointsString);

  new Curve().threePointCurveFromPointsArray([point10.getPointAsArray(),[point2.getX(), point10.getY()] , point2.getPointAsArray()]);
  new Curve().fourPointCurveFromPointsArray([point4.getPointAsArray(),  [point6.getX()-2,point6.getY()], [point6.getX(),point5.getY()+1], point7.getPointAsArray()]);
}

function generateBackBodicePattern() {
  resetSvg();
  //not all points will be added to the pattern just the ones that will drawn
  getMeasurements();
  const point1 = new Point(0, waistToShoulderLengthBack);
  const point2 = new Point(point1.getX() ,2);
  const point3 = new Point(point1.getX() + getNeckWidth(), point2.getY());
  const point4 = new Point(point3.getX(), 0);
  const point5 = new Point(getShoulderWidth(), point4.getY());
  const point6 = new Point( point5.getX(), point5.getY() + getShoulderSlope());
  const point7 = new Point(point6.getX(), point6.getY()+ getArmHoleHeight());
  const point8 = new Point(point7.getX()-1,  point6.getY()+ (getArmHoleHeight()/2));
  const point9 = new Point(bustWidth/4, point7.getY());
  const point10 = new Point((waistCirc/4)+2, point1.getY() );
  const point11 = new Point(point1.getX()+(point10.getX()/2), point1.getY());
  const point12 = new Point(point11.getX(), point7.getY()+2.5);
  const point13 = new Point(point11.getX()-1, point11.getY());
  const point14 = new Point(point11.getX()+1, point11.getY());
  const point15 = new Point( 0 , point9.getY());


  const shoulderLine = new Line(point4, point6);
  const upperArmholeLine = new Line(point6, point8);
  const lowerArmholeLine = new Line(point8, point9);
  const armpitToWaistLine = new Line(point9, point10);
  const waistLine = new Line(point10, point1);
  const centerFrontLine = new Line(point1, point2);
  const neckLineLowerLine = new Line(point2, point3);
  const neckLineVerticalLine = new Line(point3, point4);
  const backDartLine = new Line(point11, point12);
  const backDartLeftLegLine = new Line(point12, point13);
  const backDartRightLegLine = new Line(point12, point14);
  const chestLine = new Line(point15, point9);

  const pattern = new Pattern(centerFrontLine);
  pattern.addLine(neckLineLowerLine);
  pattern.addLine(neckLineVerticalLine);

  pattern.addLine(shoulderLine);

  pattern.addLine(upperArmholeLine);
  pattern.addLine(lowerArmholeLine);

  pattern.addLine(armpitToWaistLine);
  pattern.addLine(waistLine);

  pattern.addLine(backDartLine);
  pattern.addLine(backDartLeftLegLine);
  pattern.addLine(backDartRightLegLine);
  // pattern.addLine(chestLine);

  const lines = pattern.getLines();
  let pointsString = lines.join(" , ");
  console.log(pointsString);
  document.querySelector("#polyLine").setAttribute("points", pointsString);

  new Curve().threePointCurveFromPointsArray([point2.getPointAsArray(),[point4.getX(), point2.getY()] , point4.getPointAsArray()]);
  new Curve().fourPointCurveFromPointsArray([point6.getPointAsArray(),  [point8.getX()-2,point8.getY()], [point7.getX(),point7.getY()], point9.getPointAsArray()]);
}
function getNeckWidth() {
  return neckCirc / 5;
}
function getShoulderWidth() {
  return shoulderWidth / 2;
}
function getShoulderSlope() {
  return shoulderWidth / 10;
}
function getArmHoleHeight() {
  return armHoleCirc / 2;
}
function getBustWidth() {
  return bustWidth / 4 + 1;
}
function getWaistWidth() {
  return waistCirc / 4 + 1 + 3; //3 cm as dart
}

function getIntersectPoint() {
 let y = Math.sqrt( Math.pow(bustDepth, 2)-Math.pow(bustSpan,2) );
  return new Point(bustSpan,getNeckWidth()+1+y);
}

function getMiddlePoint(point1 , point2){
  let middlePoint = new Draw().getLineMiddlePoint(point1,point2);
 
  return new Point(middlePoint.xt,middlePoint.yt);
}

function getPointAwayOnLine(point1 , point2){
  let point = new Draw().getPointOnLineAwayByDistance(2.5, point1,point2);
 
  return new Point(point.xt,point.yt);
}

