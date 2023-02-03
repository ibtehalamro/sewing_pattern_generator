import { CHILD_MEASUREMENTS_INPUT_ID_ENUM } from "../../Measurements/MeasurementsEnum.js";
import { ChildPattern } from "./ChildPattern.js"
import { Point } from "../../Point.js";
import { Line } from "../../Line.js";
import { Curve } from "../../Curve.js";
import { PatternElement } from "../PatternElement.js";
import { Geometry as SVGGeometry } from "../../Geometry/SVGGeometry.js";
export class ChildSleevePattern extends ChildPattern {

    constructor(svgId) {
        super(svgId);
        this.svgId = svgId;
        const inputIds = this.getInputIds();
        this.measurements = this.measurements.getMeasurementsFromUserInput(inputIds);

        console.log('Child sleeve pattern created.');
    }
    draw() {
        this.generateSleevePattern();
        this.elements.forEach(element => {
            element.draw(this.svgId);
        });
    }

    getInputIds() {
        const { frontArmHoleCurveLengthSleeve, backArmHoleCurveLengthSleeve, backArmHoleLengthSleeve, wristWidthSleeve, sleeveLength } = CHILD_MEASUREMENTS_INPUT_ID_ENUM;
        return [frontArmHoleCurveLengthSleeve, backArmHoleCurveLengthSleeve, backArmHoleLengthSleeve, wristWidthSleeve, sleeveLength];
    }

    getArmHoleMeasurements() {
        const points = this.getPointsObject();
        const frontArmHoleCurveLength = this.getArmHoleCurve(points).generateCurvePath().getTotalLength();
        return frontArmHoleCurveLength;
    }

    generateSleevePattern() {
        this.resetSvg();
        //not all points will be added to the pattern just the ones that will drawn
        const points = this.getPointsObject();
        const { point13, point8 } = points;
        const svgElement = document.getElementById(this.svgId);
        const circle1 = this.drawObject.drawCircleAtPoint(point13, .3, "red");
        const circle2 = this.drawObject.drawCircleAtPoint(point8, .3, "red");
        svgElement.append(circle1)
        svgElement.append(circle2)
        const lines = this.getPatternLinesObject(points);
        this.createPatternObject(points, lines);
    }

    createPatternObject(points, lines) {
        const { point1, point16, point13, point14, point2, point10, point8, point11, point3 } = points;
        let patternElements = [...Object.values(lines)];

        let sleeveCurves = new Curve(PatternElement.Element.SleeveCurve);
        sleeveCurves.setPoints([
            point1.getPointAsArray(),
            [point16.getX() + 4, point16.getY() + 1],
            [point13.getX(), point13.getY() - 3],
            point14.getPointAsArray(),

            [point2.getX(), point2.getY() - 2],
            [point10.getX() + 1, point10.getY()],
            [point8.getX(), point8.getY()],
            [point11.getX() + 1, point11.getY() + 1],
            [point11.getX(), point11.getY()],
            [point3.getX(), point3.getY()]
        ]);
        patternElements.push(sleeveCurves);

        this.setElements(patternElements);
    }


    getPointsObject() {
        const ref = new Point(3, 3);
        const point1 = new Point(0, this.calculateSleeveCapHeight());
        const point2 = new Point(this.calculateSleeveWidth() / 2, 0);
        const point3 = new Point(this.calculateSleeveWidth(), point1.getY());
        const point4 = new Point(point2.getX() + this.calculateWristHalfWidth(), this.getSleeveLength());
        const point5 = new Point(point2.getX(), point4.getY());
        const point6 = new Point(point2.getX() - this.calculateWristHalfWidth(), point4.getY());

        const frontLineSegment = this.getFrontSleeveLineSegmentLength(point2, point3);
        const point7 = SVGGeometry.getPointOnLineAwayByDistance(frontLineSegment, point2, point3);
        const point8 = SVGGeometry.getPointOnLineAwayByDistance(frontLineSegment, point7, point3);
        const point9 = SVGGeometry.getPointOnLineAwayByDistance(frontLineSegment, point8, point3);
        const point10 = SVGGeometry.perpendicularPointOnLine(point2, point7, 1);
        const point11 = SVGGeometry.perpendicularPointOnLine(point2, point9, -1);

        const backLineSegment = this.getBackSleeveLineSegmentLength(point2, point1);
        const point12 = SVGGeometry.getPointOnLineAwayByDistance(backLineSegment, point2, point1);
        const point13 = SVGGeometry.getPointOnLineAwayByDistance(backLineSegment, point12, point1);
        const point14 = SVGGeometry.perpendicularPointOnLine(point2, point12, -1.5);
        const point15 = SVGGeometry.getPointOnLineAwayByDistance(backLineSegment / 2, point13, point1);
        const point16 = SVGGeometry.perpendicularPointOnLine(point2, point15, 0.5);

        const points = {
            point1, point2, point3,
            point4, point5, point6,
            point7, point8, point9,
            point10, point11, point12, point13, point14, point15, point16
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
            point10, point11, point12, point13, point14, point15, point16 } = points;
        const lines = {
            guideLine1: new Line(point1, point2, PatternElement.Element.Guide),
            guideLine2: new Line(point2, point3, PatternElement.Element.Guide),
            guideLine3: new Line(point3, point1, PatternElement.Element.Guide),
            guideLine4: new Line(point2, point5, PatternElement.Element.Guide),
            guideLine5: new Line(point5, point6, PatternElement.Element.Guide),
            guideLine6: new Line(point7, point10, PatternElement.Element.Guide),
            guideLine7: new Line(point9, point11, PatternElement.Element.Guide),
            guideLine8: new Line(point12, point14, PatternElement.Element.Guide),
            guideLine9: new Line(point15, point16, PatternElement.Element.Guide),

            backSleeveSide: new Line(point1, point6, PatternElement.Element.Main),
            frontSleeveSide: new Line(point3, point4, PatternElement.Element.Main),
            bottomSleeve: new Line(point4, point6, PatternElement.Element.Main),
        }
        return lines;
    }

    getSleeveLength() {
        return this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.sleeveLength];
    }
    calculateSleeveCapHeight() {
        return (2 / 3) * this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.backArmHoleLengthSleeve];
    }

    calculateSleeveWidth() {
        const sleeveFrontCurveLength = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.frontArmHoleCurveLengthSleeve];
        const sleeveBackCurveLength = this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.backArmHoleCurveLengthSleeve];

        const diagonal = (sleeveBackCurveLength + sleeveFrontCurveLength) / 2

        let halfWidth = Math.sqrt(Math.pow(diagonal, 2) - Math.pow(this.calculateSleeveCapHeight(), 2));
        return halfWidth * 2;
    }
    calculateWristHalfWidth() {
        return .5 * this.measurements[CHILD_MEASUREMENTS_INPUT_ID_ENUM.wristWidthSleeve];
    }

    getFrontSleeveLineSegmentLength(point1, point2) {
        const lineLength = SVGGeometry.lineLength(point1, point2);
        return lineLength / 4;
    }

    getBackSleeveLineSegmentLength(point1, point2) {
        const lineLength = SVGGeometry.lineLength(point1, point2);
        return lineLength / 3;
    }
}
