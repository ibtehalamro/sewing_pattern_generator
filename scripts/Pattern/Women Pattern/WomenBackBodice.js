import { MEASUREMENTS_INPUT_ID_ENUM } from "../../Measurements/MeasurementsEnum.js";
import { WomenPattern } from "./WomenPattern.js"
import { Point } from "../../Point.js";
import { Line } from "../../Line.js";
import { Curve } from "../../Curve.js";
import { PatternElement } from "../PatternElement.js";
export class WomenBackBodice extends WomenPattern {

    constructor(svgId) {
        super(svgId);
        this.svgId = svgId;
        const inputIds = this.getInputIds();
        this.measurements = this.measurements.getMeasurementsFromUserInput(inputIds);
        console.log('Women Back Bodice created.');
    }
    draw() {
        this.generateBackBodicePattern();
        this.elements.forEach(element => {
            element.draw(this.svgId);
        });
    }

    getInputIds() {
        const { neckCirc, shoulderWidth, armHoleCirc, waistToShoulderLength, bustWidth, waistCirc, bustSpan, bustDepth, waistToShoulderLengthBack } = MEASUREMENTS_INPUT_ID_ENUM;
        return [neckCirc, shoulderWidth, armHoleCirc, waistToShoulderLength, bustWidth, waistCirc, bustSpan, bustDepth, waistToShoulderLengthBack];
    }

    generateBackBodicePattern() {
        this.resetSvg();
        //not all points will be added to the pattern just the ones that will drawn
        const points = this.getPointsObject();

        const lines = this.getPatternLinesObject(points);
        this.createPatternObject(points, lines);
    }

    createPatternObject(points, lines) {
        const { point2, point4, point6, point7, point8, point9 } = points;
        let patternElements = [...Object.values(lines)];

        let neckCurve = new Curve(PatternElement.Element.Neck);
        neckCurve.setPoints([
            point2.getPointAsArray(),
            [point4.getX(), point2.getY()],
            point4.getPointAsArray(),
        ]);
        let armholeCurve = new Curve(PatternElement.Element.Armhole);
        armholeCurve.setPoints([
            point6.getPointAsArray(),
            [point8.getX() - 2, point8.getY()],
            [point7.getX(), point7.getY()],
            point9.getPointAsArray(),
        ]);

        patternElements.push(armholeCurve);

        patternElements.push(neckCurve);

        patternElements.push(neckCurve);
        patternElements.push(armholeCurve);
        this.setElements(patternElements);
    }
    getPointsObject() {
        const point1 = new Point(0, this.measurements[MEASUREMENTS_INPUT_ID_ENUM.waistToShoulderLengthBack]);
        const point2 = new Point(point1.getX(), 2);
        const point3 = new Point(point1.getX() + this.getNeckWidth(), point2.getY());
        const point4 = new Point(point3.getX(), 0);
        const point5 = new Point(this.getShoulderWidth(), point4.getY());
        const point6 = new Point(point5.getX(), point5.getY() + this.getShoulderSlope());
        const point7 = new Point(point6.getX(), point6.getY() + this.getArmHoleHeight());
        const point8 = new Point(
            point7.getX() - 1,
            point6.getY() + this.getArmHoleHeight() / 2
        );
        const point9 = new Point(this.measurements[MEASUREMENTS_INPUT_ID_ENUM.bustWidth] / 4, point7.getY());
        const point10 = new Point(this.measurements[MEASUREMENTS_INPUT_ID_ENUM.waistCirc] / 4 + 2, point1.getY());
        const point11 = new Point(point1.getX() + point10.getX() / 2, point1.getY());
        const point12 = new Point(point11.getX(), point7.getY() + 2.5);
        const point13 = new Point(point11.getX() - 1, point11.getY());
        const point14 = new Point(point11.getX() + 1, point11.getY());
        const point15 = new Point(0, point9.getY());

        const points = {
            point1, point2, point3,
            point4, point5, point6,
            point7, point8, point9,
            point10, point11, point12,
            point13, point14, point15
        };

        return points;
    }

    getPatternLinesObject(points) {
        const { point1, point2, point3, point4, point6, point8, point9, point10, point11, point12, point13, point14, point15 } = points;
        const lines = {
            shoulderLine: new Line(point4, point6, PatternElement.Element.Main),
            upperArmholeLine: new Line(point6, point8, PatternElement.Element.Guide),
            lowerArmholeLine: new Line(point8, point9, PatternElement.Element.Guide),
            armpitToWaistLine: new Line(point9, point10, PatternElement.Element.Main),
            waistLine: new Line(point10, point1, PatternElement.Element.Main),
            centerFrontLine: new Line(point1, point2, PatternElement.Element.Main),
            neckLineLowerLine: new Line(point2, point3, PatternElement.Element.Guide),
            neckLineVerticalLine: new Line(point3, point4, PatternElement.Element.Guide),
            backDartLine: new Line(point11, point12, PatternElement.Element.Dart),
            backDartLeftLegLine: new Line(point12, point13, PatternElement.Element.Dart),
            backDartRightLegLine: new Line(point12, point14, PatternElement.Element.Dart),
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

    getArmHoleHeight() {
        return this.measurements[MEASUREMENTS_INPUT_ID_ENUM.armHoleCirc] / 2;
    }
}










