import { CHILD_MEASUREMENTS_INPUT_ID_ENUM } from "../../Measurements/MeasurementsEnum.js";
import { ChildPattern } from "./ChildPattern.js"
import { Point } from "../../Point.js";
import { Line } from "../../Line.js";
import { Curve } from "../../Curve.js";
import { PatternElement } from "../PatternElement.js";
export class ChildBackBodice extends ChildPattern {

    constructor(svgId) {
        super(svgId);
        this.svgId = svgId;
        const inputIds = this.getInputIds();
        this.measurements = this.measurements.getMeasurementsFromUserInput(inputIds);
        console.log('Child Back Bodice created.');
    }
    draw() {
        this.generateBackBodicePattern();
        this.elements.forEach(element => {
            element.draw(this.svgId);
        });
    }

    getInputIds() {
        const { shoulderWidth, waistToShoulderLengthBack, chestCirc, bustWidth, backWidth } = CHILD_MEASUREMENTS_INPUT_ID_ENUM;
        return [shoulderWidth, waistToShoulderLengthBack, chestCirc, bustWidth, backWidth];
    }

    generateBackBodicePattern() {
        this.resetSvg();
        //not all points will be added to the pattern just the ones that will drawn
        const points = this.getPointsObject();

        const lines = this.getPatternLinesObject(points);
        this.createPatternObject(points, lines);
    }

    createPatternObject(points, lines) {
        const { point1, point2, point3, point11, point10, point7, point8, point9 } = points;
        let patternElements = [...Object.values(lines)];

        let neckCurve = new Curve(PatternElement.Element.Neck);
        neckCurve.setPoints([
            point1.getPointAsArray(),
            [point2.getX(), point2.getY()],
            point3.getPointAsArray(),
        ]);
        let armholeCurve = new Curve(PatternElement.Element.Armhole);
        armholeCurve.setPoints([
            [point8.getX(), point8.getY()],
            [point9.getX() - this.getShoulderSlope(), point9.getY()],
            [point11.getX() - this.getShoulderSlope(), point11.getY()],
            point10.getPointAsArray(),
        ]);

        patternElements.push(armholeCurve);
        patternElements.push(neckCurve);
        this.setElements(patternElements);
    }
    getPointsObject() {
        const ref = new Point(3, 3);
        const point1 = new Point(this.getNeckWidth(), 0);
        const point2 = new Point(point1.getX(), this.getNeckHeight());
        const point3 = new Point(0, point2.getY());
        const point4 = new Point(point3.getX(), point2.getY() + this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.waistToShoulderLengthBack]);
        const point5 = new Point(this.getWaistWidth(), point4.getY());
        const point6 = new Point(0, point3.getY() + this.getArmHoleHeight());
        const point7 = new Point(point6.getX(), point3.getY() + (this.getArmHoleHeight() * .5));
        const point8 = new Point(this.getPoint8XValue(), point2.getY());
        const point9 = new Point(this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.backWidth] / 2, point7.getY());
        const point10 = new Point(point5.getX(), point6.getY());
        const point11 = new Point(point9.getX(), point6.getY());

        const points = {
            point1, point2, point3,
            point4, point5, point6,
            point7, point8, point9,
            point10, point11
        };

        Object.values(points).forEach(point => {
            point.setX(point.getX() + ref.getX());
            point.setY(point.getY() + ref.getY());
        });

        return points;
    }

    getPatternLinesObject(points) {
        const { point1, point2, point3,
            point4, point5, point6,
            point7, point8, point9,
            point10, point11 } = points;
        const lines = {
            shoulderLine: new Line(point1, point8, PatternElement.Element.Main),
            armpitToWaistLine: new Line(point10, point5, PatternElement.Element.Main),
            waistLine: new Line(point4, point5, PatternElement.Element.Main),
            centerBackLine: new Line(point3, point4, PatternElement.Element.Main),
            neckLineLowerLine: new Line(point2, point3, PatternElement.Element.Guide),
            neckLineVerticalLine: new Line(point2, point1, PatternElement.Element.Guide),
            backGuid: new Line(point7, point9, PatternElement.Element.Guide),
            armholeGuide: new Line(point6, point10, PatternElement.Element.Guide),
            verticalArmholeGuide: new Line(point9, point11, PatternElement.Element.Guide)
        }
        return lines;
    }

    getNeckWidth = () => {

        const chestCirc = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.chestCirc];
        return .1 * (.5 * chestCirc) + 2.5;
    }
    getNeckHeight = () => {
        const chestCirc = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.chestCirc];
        return .05 * (.5 * chestCirc) + .3;
    }
    getShoulderWidth() {
        return this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.shoulderWidth] / 2;
    }
    getShoulderSlope() {
        return this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.shoulderWidth] / 10;
    }
    getArmHoleHeight() {
        const shoulderToWaistBackLength = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.waistToShoulderLengthBack];
        return (.5 * shoulderToWaistBackLength) + .5;
    }

    getPoint8XValue() {
        const shoulderWidth = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.shoulderWidth];
        return Math.sqrt(Math.pow(shoulderWidth, 2) + Math.pow(this.getNeckHeight(), 2)) + this.getNeckWidth();
    }

    getWaistWidth() {
        const chestCirc = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.chestCirc];
        return (chestCirc * .25) + 1
    }
}
