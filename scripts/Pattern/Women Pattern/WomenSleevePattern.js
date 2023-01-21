import { MEASUREMENTS_INPUT_ID_ENUM } from "../../Measurements/MeasurementsEnum.js";
import { WomenPattern } from "./WomenPattern.js"
import { Point } from "../../Point.js";
import { Line } from "../../Line.js";
import { Curve } from "../../Curve.js";
import { PatternElement } from "../PatternElement.js";
import { Geometry as SVGGeometry } from "../../Geometry/SVGGeometry.js";
export class WomenSleevePattern extends WomenPattern {

    constructor(svgId) {
        super(svgId);
        this.svgId = svgId;
        const inputIds = this.getInputIds();
        this.measurements = this.measurements.getMeasurementsFromUserInput(inputIds);
        console.log('Women Sleeve created.');
    }
    draw() {
        this.generateSleevePattern();
        this.elements.forEach(element => {
            element.draw(this.svgId);
        });
    }

    getInputIds() {
        const { bustWidth, frontArmHoleLengthSleeve, backArmHoleLengthSleeve,
            wristWidthSleeve, sleeveLength } = MEASUREMENTS_INPUT_ID_ENUM;

        return [bustWidth, frontArmHoleLengthSleeve, backArmHoleLengthSleeve,
            wristWidthSleeve, sleeveLength];
    }

    generateSleevePattern() {
        this.resetSvg();
        //not all points will be added to the pattern just the ones that will drawn
        const points = this.getPointsObject();

        const lines = this.getPatternLinesObject(points);
        this.createPatternObject(points, lines);
    }

    createPatternObject(points, lines) {
        const { point1, point2, point3, point4, point5, point6, point7, point8, point10, point11,
            point12, point13, point14, point15, point16, point17, point18, point19, point20, point21 } = points;
        console.log('lines', lines)
        console.log('points', points)
        let patternElements = [...Object.values(lines)];


        let sleeveCurves = new Curve(PatternElement.Element.SleeveCurve);
        sleeveCurves.setPoints([
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
        patternElements.push(sleeveCurves);
        this.setElements(patternElements);
    }
    getPointsObject() {
        console.log(' this.sleeveCupHeight()', this.sleeveCupHeight())
        const point1 = new Point(0, this.sleeveCupHeight());
        const point2 = new Point(this.sleeveRectWidth() - 1, 0);
        const point3 = new Point(this.sleeveRectWidth(), 0);
        const point4 = new Point(this.sleeveRectWidth() + 1, 0);
        const point5 = new Point(this.sleeveRectWidth() * 2, this.sleeveCupHeight());
        const point6 = new Point(point3.getX() + (.5 * this.measurements[MEASUREMENTS_INPUT_ID_ENUM.wristWidthSleeve]), this.measurements[MEASUREMENTS_INPUT_ID_ENUM.sleeveLength]);
        const point7 = new Point(point3.getX(), point6.getY());
        const point8 = new Point(point3.getX() - (.5 * this.measurements[MEASUREMENTS_INPUT_ID_ENUM.wristWidthSleeve]), this.measurements[MEASUREMENTS_INPUT_ID_ENUM.sleeveLength]);
        const point9 = new Point(point3.getX(), this.sleeveCupHeight());
        ////////
        const segmentLength = this.getSleeveCapLineSegmentLength(point1, point2);
        const point10 = SVGGeometry.getPointOnLineAwayByDistance(segmentLength, point1, point2);
        const point11 = SVGGeometry.getPointOnLineAwayByDistance(segmentLength * 2, point1, point2);
        const point12 = SVGGeometry.getPointOnLineAwayByDistance(segmentLength * 3, point1, point2);
        const point13 = SVGGeometry.getPointOnLineAwayByDistance(segmentLength, point4, point5);
        const point14 = SVGGeometry.getPointOnLineAwayByDistance(segmentLength * 2, point4, point5);
        const point15 = SVGGeometry.getPointOnLineAwayByDistance(segmentLength * 3, point4, point5);
        const point16 = SVGGeometry.perpendicularPointOnLine(point4, point13, 1.5);
        const point17 = SVGGeometry.perpendicularPointOnLine(point5, point15, -1.5);
        const point18 = SVGGeometry.perpendicularPointOnLine(point4, point14, .5);
        const point19 = SVGGeometry.perpendicularPointOnLine(point2, point12, -1.5);
        const point20 = SVGGeometry.perpendicularPointOnLine(point2, point11, -1);
        const point21 = SVGGeometry.perpendicularPointOnLine(point2, point10, 0.75);

        const points = {
            point1, point2, point3,
            point4, point5, point6,
            point7, point8, point9,
            point10, point11, point12,
            point13, point14, point15,
            point16, point17, point18, point19, point20, point21
        };

        return points;
    }

    getPatternLinesObject(points) {
        const { point1, point2, point3, point4, point5, point6, point7, point8, point10, point11,
            point12, point13, point14, point15, point16, point17, point18, point19, point20, point21 } = points;
        const lines = {
            guideLine1: new Line(point1, point2, PatternElement.Element.Guide),
            guideLine2: new Line(point2, point3, PatternElement.Element.Guide),
            guideLine3: new Line(point3, point4, PatternElement.Element.Guide),
            guideLine4: new Line(point4, point5, PatternElement.Element.Guide),
            guideLine5: new Line(point5, point6, PatternElement.Element.Guide),
            guideLine6: new Line(point6, point7, PatternElement.Element.Guide),
            guideLine7: new Line(point7, point8, PatternElement.Element.Guide),
            guideLine8: new Line(point8, point1, PatternElement.Element.Guide),
            guideLine9: new Line(point1, point5, PatternElement.Element.Guide),
            guideLine10: new Line(point3, point7, PatternElement.Element.Guide),
            guideLinePerp1: new Line(point13, point16, PatternElement.Element.Guide),
            guideLinePerp2: new Line(point14, point18, PatternElement.Element.Guide),
            guideLinePerp3: new Line(point15, point17, PatternElement.Element.Guide),
            guideLinePerp4: new Line(point11, point20, PatternElement.Element.Guide),
            guideLinePerp5: new Line(point10, point21, PatternElement.Element.Guide),
            guideLinePerp6: new Line(point12, point19, PatternElement.Element.Guide),

            backSleeveSide: new Line(point1, point8, PatternElement.Element.Main),
            frontSleeveSide: new Line(point5, point6, PatternElement.Element.Main),
            bottomSleeve: new Line(point6, point8, PatternElement.Element.Main),
        }
        return lines;
    }


    getSleeveCapLineSegmentLength(point1, point2) {
        const lineLength = SVGGeometry.lineLength(point1, point2);
        return lineLength / 4;
    }

    sleeveRectWidth() {
        return this.measurements[MEASUREMENTS_INPUT_ID_ENUM.frontArmHoleLengthSleeve] - 1;
    }

    sleeveCupHeight() {
        return (2 / 3) * this.measurements[MEASUREMENTS_INPUT_ID_ENUM.backArmHoleLengthSleeve];
    }
}