import { CHILD_MEASUREMENTS_INPUT_ID_ENUM } from "../../Measurements/MeasurementsEnum.js";
import { ChildPattern } from "./ChildPattern.js"
import { Point } from "../../Point.js";
import { Line } from "../../Line.js";
import { Curve } from "../../Curve.js";
import { PatternElement } from "../PatternElement.js";
export class ChildFrontBodice extends ChildPattern {

    constructor(svgId) {
        super(svgId);
        this.svgId = svgId;
        const inputIds = this.getInputIds();
        this.measurements = this.measurements.getMeasurementsFromUserInput(inputIds);
        console.log('Child Front Bodice created.');
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

    getArmHoleMeasurements() {
        const points = this.getPointsObject();
        const frontArmHoleCurveLength = this.getArmHoleCurve(points).generateCurvePath().getTotalLength();
        return frontArmHoleCurveLength;
    }

    generateBackBodicePattern() {
        this.resetSvg();
        //not all points will be added to the pattern just the ones that will drawn
        const points = this.getPointsObject();

        const lines = this.getPatternLinesObject(points);
        this.createPatternObject(points, lines);
    }

    createPatternObject(points, lines) {
        const { point1, point7, point4, point11, point10, point5, point12, point9 } = points;
        let patternElements = [...Object.values(lines)];

        let neckCurve = new Curve(PatternElement.Element.Neck);
        neckCurve.setPoints([
            point1.getPointAsArray(),
            [point5.getX(), point5.getY()],
            point4.getPointAsArray(),
        ]);
        let armholeCurve = this.getArmHoleCurve(points);

        patternElements.push(armholeCurve);
        patternElements.push(neckCurve);
        this.setElements(patternElements);
    }
    getArmHoleCurve(points) {
        const { point7, point11, point12, point9 } = points;
        let armholeCurve = new Curve(PatternElement.Element.Armhole);
        armholeCurve.setPoints([
            [point7.getX(), point7.getY()],
            [point11.getX() - this.getShoulderSlope(), point11.getY()],
            [point12.getX() - this.getShoulderSlope(), point12.getY()],
            point9.getPointAsArray(),
        ]);
        return armholeCurve;
    }

    getPointsObject() {
        const ref = new Point(3, 3);
        const point1 = new Point(0, this.getFrontNeckHeight());
        const point2 = new Point(0, this.getFrontCenterLength());
        const point3 = new Point(this.getWaistWidth(), point2.getY());
        const point4 = new Point(this.getFrontNeckWidth(), 0);
        const point5 = new Point(point4.getX(), this.getFrontNeckHeight());
        const point6 = new Point(point4.getX(), .5 + this.getBackNeckHeight() + .7);
        const point7 = new Point(this.getPoint7XValue(), point6.getY());
        const point8 = new Point(0, .5 + this.getBackNeckHeight() + this.getArmHoleHeight());
        const point9 = new Point(this.getWaistWidth(), point8.getY());
        const point10 = new Point(0, .5 + this.getBackNeckHeight() + (this.getArmHoleHeight() / 2));
        const point11 = new Point(this.getChestWidth(), point10.getY());
        const point12 = new Point(this.getChestWidth(), point8.getY());

        const points = {
            point1, point2, point3,
            point4, point5, point6,
            point7, point8, point9,
            point10, point11, point12
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
            point10, point11, point12 } = points;
        const lines = {
            shoulderLine: new Line(point4, point7, PatternElement.Element.Main),
            armpitToWaistLine: new Line(point9, point3, PatternElement.Element.Main),
            waistLine: new Line(point3, point2, PatternElement.Element.Main),
            centerFrontLine: new Line(point1, point2, PatternElement.Element.Main),
            neckLineLowerLine: new Line(point1, point5, PatternElement.Element.Guide),
            neckLineVerticalLine: new Line(point4, point5, PatternElement.Element.Guide),
            chestGuid: new Line(point10, point11, PatternElement.Element.Guide),
            armholeGuide: new Line(point8, point9, PatternElement.Element.Guide),
            verticalArmholeGuide: new Line(point11, point12, PatternElement.Element.Guide)
        }
        return lines;
    }

    getChestWidth() {
        return this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.bustWidth] / 2;
    }
    getFrontCenterLength() {
        const shoulderToWaistBackLength = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.waistToShoulderLengthBack];

        return .5 + this.getBackNeckHeight() + shoulderToWaistBackLength;
    }
    getFrontNeckWidth = () => {

        const chestCirc = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.chestCirc];
        return .1 * (.5 * chestCirc) + 2.25;
    }
    getFrontNeckHeight = () => {
        const chestCirc = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.chestCirc];
        return .1 * (.5 * chestCirc) + 2.75;
    }

    getBackNeckWidth = () => {

        const chestCirc = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.chestCirc];
        return .1 * (.5 * chestCirc) + 2.5;
    }
    getBackNeckHeight = () => {
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

    getPoint7XValue() {
        const shoulderWidth = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.shoulderWidth];
        return Math.sqrt(Math.pow(shoulderWidth, 2) + Math.pow(this.getBackNeckHeight() + .7 + .5, 2)) + this.getFrontNeckWidth();
    }

    getWaistWidth() {
        const chestCirc = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.chestCirc];
        return (chestCirc * .25) + 1
    }
}
