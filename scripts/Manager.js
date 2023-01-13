import { Draw } from "./Draw.js";
import { SVGDownloadHandler } from "./Buttons.js";
import { Pattern } from "./Pattern.js";
import { Point } from "./Point.js";
import { Line } from "./Line.js";
import { Curve } from "./Curve.js";
import { PatternElement } from "./PatternElement.js";

let neckCirc = 0;
let shoulderWidth = 0;
let armHoleCirc = 0;
let bustWidth = 0;
let waistToShoulderLength = 0;
let waistToShoulderLengthBack = 0;
let waistCirc = 0;
let bustSpan = 0;
let bustDepth = 0;
let frontArmHoleLength = 0;
let backArmHoleLength = 0;
let wristWidth = 0;
let sleeveLength = 0;
(() => {
  resetSvg();
  entryPoint();
  manageButtons();
})();

function entryPoint() {
  drawGrid();
}

function resetSvg() {
  const grid = document.getElementById("grid").cloneNode(true);
  document.getElementById("svg").innerHTML = "";
  document.getElementById("svg").appendChild(grid);
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
  document
    .querySelector("#generate_women_sleeve")
    .addEventListener("click", () => generateWomenSleevePattern());
  manageLineStrokeRangeSelector();
}

function getMeasurements() {
  neckCirc = parseFloat(document.querySelector("#neck_circ").value);
  shoulderWidth = parseFloat(document.querySelector("#shoulder_width").value);
  armHoleCirc = parseFloat(document.querySelector("#armhole_circ").value);
  bustWidth = parseFloat(document.querySelector("#bust_circ").value);
  waistToShoulderLength = parseFloat(
    document.querySelector("#shoulder_to_waist").value
  );
  waistToShoulderLengthBack = parseFloat(
    document.querySelector("#shoulder_to_waist_back").value
  );
  waistCirc = parseFloat(document.querySelector("#waist_circ").value);
  bustSpan = parseFloat(document.querySelector("#bust_span").value);
  bustDepth = parseFloat(document.querySelector("#bust_depth").value);
  frontArmHoleLength = parseFloat(document.querySelector("#front_armhole_length").value);
  backArmHoleLength = parseFloat(document.querySelector("#back_armhole_length").value);
  wristWidth = parseFloat(document.querySelector("#wrist_width").value);
  sleeveLength = parseFloat(document.querySelector("#sleeve_length").value);
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
  const point10 = new Point(point1.getX(), point1.getY() + getNeckWidth() + 1);
  const point11 = new Point(point2.getX(), point10.getY());
  const point12 = new Point(bustSpan, waistToShoulderLength);
  const point13 = getIntersectPoint();
  const point14 = new Point(bustSpan, point13.getY() + 2.5);
  const point15 = getMiddlePoint(point7, point9); //middle point
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
  const frontDartLeftLegLine = new Line(
    point14,
    new Point(point12.getX() - 1.5, point12.getY())
  );
  const frontDartRightLegLine = new Line(
    point14,
    new Point(point12.getX() + 1.5, point12.getY())
  );
  const sideDartLowerLine = new Line(point13, point15);
  const sideDartMiddlePoint = new Line(point16, point17);
  const sideDartUpperPoint = new Line(point16, point18);

  let mainBlock = [];
  mainBlock.push(shoulderLine);
  mainBlock.push(armpitToWaistLine);
  mainBlock.push(waistLine);
  mainBlock.push(centerFrontLine);

  let dartLines = [];
  dartLines.push(frontDartLine);
  dartLines.push(frontDartLeftLegLine);
  dartLines.push(frontDartRightLegLine);
  dartLines.push(sideDartLowerLine);
  dartLines.push(sideDartMiddlePoint);
  dartLines.push(sideDartUpperPoint);

  let extraElements = [];
  extraElements.push(bustDepthLine);
  extraElements.push(upperArmholeLine);
  extraElements.push(lowerArmholeLine);
  extraElements.push(neckLineLowerLine);
  extraElements.push(neckLineVerticalLine);

  let neckCurve = new Curve();
  neckCurve.setPoints([
    point10.getPointAsArray(),
    [point2.getX(), point10.getY()],
    point2.getPointAsArray(),
  ]);
  let armholeCurve = new Curve();
  armholeCurve.setPoints([
    point4.getPointAsArray(),
    [point6.getX() - 2, point6.getY()],
    [point6.getX(), point5.getY() + 1],
    point7.getPointAsArray(),
  ]);
  let curves = [];
  curves.push(neckCurve);
  curves.push(armholeCurve);

  const pattern = new Pattern();
  pattern.setMainElements(mainBlock);
  pattern.setDartLines(dartLines);
  pattern.setGuideElements(extraElements);
  pattern.setArmholeCurves(curves);
  pattern.draw("svg");
}

function generateBackBodicePattern() {
  resetSvg();
  //not all points will be added to the pattern just the ones that will drawn
  getMeasurements();
  const point1 = new Point(0, waistToShoulderLengthBack);
  const point2 = new Point(point1.getX(), 2);
  const point3 = new Point(point1.getX() + getNeckWidth(), point2.getY());
  const point4 = new Point(point3.getX(), 0);
  const point5 = new Point(getShoulderWidth(), point4.getY());
  const point6 = new Point(point5.getX(), point5.getY() + getShoulderSlope());
  const point7 = new Point(point6.getX(), point6.getY() + getArmHoleHeight());
  const point8 = new Point(
    point7.getX() - 1,
    point6.getY() + getArmHoleHeight() / 2
  );
  const point9 = new Point(bustWidth / 4, point7.getY());
  const point10 = new Point(waistCirc / 4 + 2, point1.getY());
  const point11 = new Point(point1.getX() + point10.getX() / 2, point1.getY());
  const point12 = new Point(point11.getX(), point7.getY() + 2.5);
  const point13 = new Point(point11.getX() - 1, point11.getY());
  const point14 = new Point(point11.getX() + 1, point11.getY());
  const point15 = new Point(0, point9.getY());

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

  let mainBlock = [];
  mainBlock.push(shoulderLine);
  mainBlock.push(armpitToWaistLine);
  mainBlock.push(waistLine);
  mainBlock.push(centerFrontLine);

  let dartLines = [];
  dartLines.push(backDartLine);
  dartLines.push(backDartLeftLegLine);
  dartLines.push(backDartRightLegLine);

  let extraElements = [];
  extraElements.push(upperArmholeLine);
  extraElements.push(lowerArmholeLine);
  extraElements.push(neckLineLowerLine);
  extraElements.push(neckLineVerticalLine);

  let neckCurve = new Curve();
  neckCurve.setPoints([
    point2.getPointAsArray(),
    [point4.getX(), point2.getY()],
    point4.getPointAsArray(),
  ]);
  let armholeCurve = new Curve();
  armholeCurve.setPoints([
    point6.getPointAsArray(),
    [point8.getX() - 2, point8.getY()],
    [point7.getX(), point7.getY()],
    point9.getPointAsArray(),
  ]);

  let armholeCurves = [];
  armholeCurves.push(armholeCurve);

  let neckLineCurves = [];
  armholeCurves.push(neckCurve);

  const pattern = new Pattern();
  pattern.setMainElements(mainBlock);
  pattern.setDartLines(dartLines);
  pattern.setGuideElements(extraElements);
  pattern.setArmholeCurves(armholeCurves);
  pattern.setNeckLineCurves(neckLineCurves);
  pattern.draw("svg");
}
function getSleeveCapLineSegmentLength(point1, point2) {
  const lineLength = new Draw().lineLength(point1, point2);
  return lineLength / 4;
}
function generateWomenSleevePattern() {
  resetSvg();
  //not all points will be added to the pattern just the ones that will drawn
  getMeasurements();
  const point1 = new Point(0, sleeveCupHeight());
  const point2 = new Point(sleeveRectWidth() - 1, 0);
  const point3 = new Point(sleeveRectWidth(), 0);
  const point4 = new Point(sleeveRectWidth() + 1, 0);
  const point5 = new Point(sleeveRectWidth() * 2, sleeveCupHeight());
  const point6 = new Point(point3.getX() + (.5 * wristWidth), sleeveLength);
  const point7 = new Point(point3.getX(), point6.getY());
  const point8 = new Point(point3.getX() - (.5 * wristWidth), sleeveLength);
  const point9 = new Point(point3.getX(), sleeveCupHeight());
  ////////
  const segmentLength = getSleeveCapLineSegmentLength(point1, point2);
  const point10 = getPointOnLineAwayByDistance(segmentLength, point1, point2);
  const point11 = getPointOnLineAwayByDistance(segmentLength * 2, point1, point2);
  const point12 = getPointOnLineAwayByDistance(segmentLength * 3, point1, point2);
  const point13 = getPointOnLineAwayByDistance(segmentLength, point4, point5);
  const point14 = getPointOnLineAwayByDistance(segmentLength * 2, point4, point5);
  const point15 = getPointOnLineAwayByDistance(segmentLength * 3, point4, point5);
  const point16 = perpendicularPointOnLine(point4, point13, 1.5);
  const point17 = perpendicularPointOnLine(point5, point15, -1.5);
  const point18 = perpendicularPointOnLine(point4, point14, .5);
  const point19 = perpendicularPointOnLine(point2, point12, -1.5);
  const point20 = perpendicularPointOnLine(point2, point11, -1);
  const point21 = perpendicularPointOnLine(point2, point10, 0.75);



  const guideLine1 = new Line(point1, point2);
  const guideLine2 = new Line(point2, point3);
  const guideLine3 = new Line(point3, point4);
  const guideLine4 = new Line(point4, point5);
  const guideLine5 = new Line(point5, point6);
  const guideLine6 = new Line(point6, point7);
  const guideLine7 = new Line(point7, point8);
  const guideLine8 = new Line(point8, point1);
  const guideLine9 = new Line(point1, point5);
  const guideLine10 = new Line(point3, point7);
  const guideLinePerp1 = new Line(point13, point16);
  const guideLinePerp2 = new Line(point14, point18);
  const guideLinePerp3 = new Line(point15, point17);
  const guideLinePerp4 = new Line(point11, point20);
  const guideLinePerp5 = new Line(point10, point21);
  const guideLinePerp6 = new Line(point12, point19);

  const backSleeveSide = new Line(point1, point8);
  const frontSleeveSide = new Line(point5, point6);
  const bottomSleeve = new Line(point6, point8);

  let guideElements = [];
  guideElements.push(guideLine1);
  guideElements.push(guideLine2);
  guideElements.push(guideLine3);
  guideElements.push(guideLine4);
  guideElements.push(guideLine5);
  guideElements.push(guideLine6);
  guideElements.push(guideLine7);
  guideElements.push(guideLine8);
  guideElements.push(guideLine9);
  guideElements.push(guideLine10);
  const mainBlock = [];
  mainBlock.push(guideLinePerp1);
  mainBlock.push(guideLinePerp2);
  mainBlock.push(guideLinePerp3);
  mainBlock.push(guideLinePerp4);
  mainBlock.push(guideLinePerp5);
  mainBlock.push(guideLinePerp6);
  mainBlock.push(backSleeveSide);
  mainBlock.push(frontSleeveSide);
  mainBlock.push(bottomSleeve);

  let backCurve = new Curve();
  backCurve.setPoints([
    point1.getPointAsArray(),
    [point1.getX() + 4, point1.getY()],
    [point21.getX(), point21.getY()],
    point20.getPointAsArray(),

    [point19.getX(), point19.getY() - 1],
    [point2.getX(), point2.getY()],
    [point3.getX(), point3.getY()],
    [point4.getX(), point4.getY()],
    [point16.getX() + 2, point16.getY()],
    point14.getPointAsArray(),
    point17.getPointAsArray(),
    [point5.getX() - 4, point5.getY()],
    point5.getPointAsArray()

  ]);

  new Draw().drawSleeveCurve(backCurve);

  const pattern = new Pattern();
  pattern.setMainElements(mainBlock);
  pattern.setGuideElements(guideElements);
  pattern.draw("svg");
}


function sleeveRectWidth() {
  return frontArmHoleLength - 1;
}

function sleeveCupHeight() {
  return (2 / 3) * backArmHoleLength;
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
  let y = Math.sqrt(Math.pow(bustDepth, 2) - Math.pow(bustSpan, 2));
  return new Point(bustSpan, getNeckWidth() + 1 + y);
}

function getMiddlePoint(point1, point2) {
  let middlePoint = new Draw().getLineMiddlePoint(point1, point2);

  return new Point(middlePoint.xt, middlePoint.yt);
}

function getPointAwayOnLine(point1, point2) {
  let point = new Draw().getPointOnLineAwayByDistance(2.5, point1, point2);

  return new Point(point.xt, point.yt);
}
function getPointOnLineAwayByDistance(distance, point1, point2) {
  let point = new Draw().getPointOnLineAwayByDistance(distance, point1, point2);

  return new Point(point.xt, point.yt);
}

function perpendicularPointOnLine(point1, point2, distance) {
  let point = new Draw().perpendicularPointOnLine(point1, point2, distance);

  return new Point(point.xt, point.yt);
}
function manageLineStrokeRangeSelector() {
  const inputRange = document.querySelector('#line-stroke');

  inputRange.addEventListener('input', () => {
    const value = inputRange.value;

    const patternElementKeys = Object.keys(PatternElement.Element);
    patternElementKeys.forEach((patternElementKey) => {
      const mainElements = document.querySelectorAll("." + PatternElement.Element[patternElementKey].className);
      mainElements.forEach(element => { element.setAttribute('stroke-width', (value / 10) * PatternElement.Element[patternElementKey].weight); console.log("value"); })

    })

    console.log(value);
  });



}
