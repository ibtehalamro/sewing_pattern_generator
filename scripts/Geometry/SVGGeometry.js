import { Point } from "../Point.js"
export class Geometry {
    constructor() {

    }

    static getIntersection(Point1, Point2, Point3, Point4) {
        let x1 = Point1.getX(), y1 = Point1.getY();
        let x2 = Point2.getX(), y2 = Point2.getY();
        let x3 = Point3.getX(), y3 = Point3.getY();
        let x4 = Point4.getX(), y4 = Point4.getY();
    
        let denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denom === 0) {
            // lines are parallel
            return null;
        }
    
        let pointX = ((x1*y2 - y1*x2) * (x3 - x4) - (x1 - x2) * (x3*y4 - y3*x4)) / denom;
        let pointY = ((x1*y2 - y1*x2) * (y3 - y4) - (y1 - y2) * (x3*y4 - y3*x4)) / denom;
    
        return {x: pointX, y: pointY};
    }

    static getEndPointOfLinePassThroughPoint(start, length, point) {
        let dx = point.x - start.x;
        let dy = point.y - start.y;
        let lineLength = Math.sqrt(dx * dx + dy * dy);
        let ratio = length / lineLength;
       const poin1t =  {x: start.x + dx * ratio, y: start.y + dy * ratio};
        return new Point(poin1t.x, poin1t.y);

    }
    

    static getIntersectPoint  (bustDepth, bustSpan , neckWidth) {
        let y = Math.sqrt(Math.pow(bustDepth, 2) - Math.pow(bustSpan, 2));
        return new Point(bustSpan, neckWidth + 1 + y);
    }

    static getPointOnLineAwayByDistance(lineLength, point1, point2) {
        const x1 = point1.getX();
        const y1 = point1.getY();

        const x2 = point2.getX();
        const y2 = point2.getY();

        let dis = Math.hypot(x2 - x1, y2 - y1);

        let moving = lineLength;
        let t = moving / dis;

        let xt = (1 - t) * x1 + t * x2;
        let yt = (1 - t) * y1 + t * y2;
        return new Point(xt, yt);

    }

    static getLineMiddlePoint(point1, point2) {
        let x1 = point1.getX() + 4;
        let y1 = point1.getY();

        let x2 = point2.getX();
        let y2 = point2.getY();

        let dis = Math.hypot(x2 - x1, y2 - y1) / 2;

        return this.getPointOnLineAwayByDistance(dis, point1, point2);
    }

    static lineLength(point1, point2) {
        let xDiff = point2.getX() - point1.getX();
        let yDiff = point2.getY() - point1.getY();
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }
 

    static perpendicularPointOnLine(point1, point2, distance) {
        let slope = (point2.getY() - point1.getY()) / (point2.getX() - point1.getX());
        let perpSlope = -1 / slope;
        let perpX = point2.getX() + distance / Math.sqrt(1 + perpSlope * perpSlope);
        let perpY = point2.getY() + perpSlope * (perpX - point2.getX());
        return new Point(perpX, perpY);
    }
}