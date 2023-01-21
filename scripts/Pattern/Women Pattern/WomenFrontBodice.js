import { MEASUREMENTS_INPUT_ID_ENUM } from "../../Measurements/MeasurementsEnum.js";
import { WomenPattern } from "./WomenPattern.js"
import { Point } from "../../Point.js";
import { Line } from "../../Line.js";
import { Curve } from "../../Curve.js";
import { PatternElement } from "../PatternElement.js";
import { Geometry as SVGGeometry } from "../../Geometry/SVGGeometry.js";
export class WomenFrontBodice extends WomenPattern {

    constructor(svgId) {
        super(svgId);
        this.svgId = svgId;
        const inputIds = this.getInputIds();
        this.measurements = this.measurements.getMeasurementsFromUserInput(inputIds);
        console.log('Women Front Bodice created.');
    }
    draw() {
        this.generateFrontBodicePattern();
        this.elements.forEach(element => {
            element.draw(this.svgId);
        });
    }

    getInputIds() {
        const { neckCirc, shoulderWidth, armHoleCirc, bustWidth, waistToShoulderLength, waistCirc, bustSpan, bustDepth } = MEASUREMENTS_INPUT_ID_ENUM;
        return [neckCirc, shoulderWidth, armHoleCirc, bustWidth, waistToShoulderLength, waistCirc, bustSpan, bustDepth];
    }

    generateFrontBodicePattern() {
        this.resetSvg();
        //not all points will be added to the pattern just the ones that will drawn
        const points = this.getPointsObject();

        const lines = this.getPatternLinesObject(points);
        this.createPatternObject(points, lines);
    }

    createPatternObject(points, lines) {
        const { point2, point4, point5, point6, point7, point10 } = points;

        let patternElements = [...Object.values(lines)];

        let neckCurve = new Curve(PatternElement.Element.Neck);
        neckCurve.setPoints([
            point10.getPointAsArray(),
            [point2.getX(), point10.getY()],
            point2.getPointAsArray(),
        ]);
        let armholeCurve = new Curve(PatternElement.Element.Armhole);
        armholeCurve.setPoints([
            point4.getPointAsArray(),
            [point6.getX() - 2, point6.getY()],
            [point6.getX(), point5.getY() + 1],
            point7.getPointAsArray(),
        ]);
        patternElements.push(neckCurve);
        patternElements.push(armholeCurve);
        this.setElements(patternElements);
    }
    getPointsObject() {
        const point1 = new Point(0, 0);
        const point2 = new Point(point1.getX() + this.getNeckWidth(), point1.getY());
        const point3 = new Point(point1.getX() + this.getShoulderWidth(), point1.getY());
        const point4 = new Point(point3.getX(), point3.getY() + this.getShoulderSlope());
        const point5 = new Point(point4.getX(), point4.getY() + this.getArmHoleHeight());
        const point6 = new Point(point4.getX() - 2, point4.getY() + this.getArmHoleHeight() / 2);
        const point7 = new Point(this.getBustWidth(), point5.getY());
        const point8 = new Point(point1.getX(), this.measurements[MEASUREMENTS_INPUT_ID_ENUM.waistToShoulderLength]);
        const point9 = new Point(this.getWaistWidth(), point8.getY());
        const point10 = new Point(point1.getX(), point1.getY() + this.getNeckWidth() + 1);
        const point11 = new Point(point2.getX(), point10.getY());
        const point12 = new Point(this.measurements[MEASUREMENTS_INPUT_ID_ENUM.bustSpan], this.measurements[MEASUREMENTS_INPUT_ID_ENUM.waistToShoulderLength]);
        const point13 = this.getBustPoint(this.measurements[MEASUREMENTS_INPUT_ID_ENUM.bustDepth], this.measurements[MEASUREMENTS_INPUT_ID_ENUM.bustSpan], this.getNeckWidth());

        const point14 = new Point(this.measurements[MEASUREMENTS_INPUT_ID_ENUM.bustSpan], point13.getY() + 2.5);
        const point15 = SVGGeometry.getLineMiddlePoint(point7, point9); //middle point of the side line
        const point16 = SVGGeometry.getPointOnLineAwayByDistance(2.5, point13, point15);
        const point17 = SVGGeometry.getPointOnLineAwayByDistance(2.5, point15, point7);
        const point18 = SVGGeometry.getPointOnLineAwayByDistance(2.5, point17, point7);

        const lowerDartLineLength = SVGGeometry.lineLength(point16, point15);
        const point19 = SVGGeometry.getEndPointOfLinePassThroughPoint(point16, lowerDartLineLength, point18)

        const points = {
            point1, point2, point3,
            point4, point5, point6,
            point7, point8, point9,
            point10, point11, point12,
            point13, point14, point15,
            point16, point17, point18, point19
        };

        return points;
    }

    getPatternLinesObject(points) {
        const { point2, point4, point6, point7, point8, point9, point10, point11, point12, point13, point14, point15, point16, point17, point19 } = points;
        const lines = {
            shoulderLine: new Line(point2, point4, PatternElement.Element.Main),
            upperArmholeLine: new Line(point4, point6, PatternElement.Element.Guide),
            lowerArmholeLine: new Line(point6, point7, PatternElement.Element.Guide),
            armpitToWaistLine: new Line(point7, point9, PatternElement.Element.Guide),
            waistLine: new Line(point9, point8, PatternElement.Element.Main),
            centerFrontLine: new Line(point8, point10, PatternElement.Element.Main),
            neckLineLowerLine: new Line(point10, point11, PatternElement.Element.Guide),
            neckLineVerticalLine: new Line(point11, point2, PatternElement.Element.Guide),
            bustDepthLine: new Line(point10, point13, PatternElement.Element.Guide),
            frontDartLine: new Line(point12, point13, PatternElement.Element.Dart),
            frontDartLeftLegLine: new Line(point14, new Point(point12.getX() - 1.5, point12.getY()), PatternElement.Element.Dart),
            frontDartRightLegLine: new Line(point14, new Point(point12.getX() + 1.5, point12.getY()), PatternElement.Element.Dart),
            sideDartLowerLine: new Line(point13, point15, PatternElement.Element.Dart),
            sideDartMiddlePoint: new Line(point16, point17, PatternElement.Element.Dart),
            sideDartUpperPoint: new Line(point16, point19, PatternElement.Element.Dart),
            upperSideLine: new Line(point7, point19, PatternElement.Element.Main),
            middleSideLine: new Line(point19, point17, PatternElement.Element.Main),
            lowerSideLine: new Line(point17, point9, PatternElement.Element.Main),
        }
        return lines;
    }

    getNeckWidth = () => {
        return this.measurements[MEASUREMENTS_INPUT_ID_ENUM.neckCirc] / 5;
    }
    getShoulderWidth() {
        return this.measurements[MEASUREMENTS_INPUT_ID_ENUM.shoulderWidth] / 2;
    }
    getShoulderSlope() {
        return this.measurements[MEASUREMENTS_INPUT_ID_ENUM.shoulderWidth] / 10;
    }
    getArmHoleHeight() {
        return this.measurements[MEASUREMENTS_INPUT_ID_ENUM.armHoleCirc] / 2;
    }
    getBustWidth() {
        return this.measurements[MEASUREMENTS_INPUT_ID_ENUM.bustWidth] / 4 + 1;
    }
    getWaistWidth() {
        return this.measurements[MEASUREMENTS_INPUT_ID_ENUM.waistCirc] / 4 + 1 + 3; //3 cm as dart
    }
    getBustPoint(bustDepth, bustSpan, neckWidth) {
        let y = Math.sqrt(Math.pow(bustDepth, 2) - Math.pow(bustSpan, 2));
        return new Point(bustSpan, neckWidth + 1 + y);
    }
}