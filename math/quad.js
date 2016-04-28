import Point from './point';

export default class Quad {

    constructor(origin, width, height) {
        this.origin = origin;
        this.width = width;
        this.height = height;
        this.xmin = origin.x;
        this.xmax = origin.x + width;
        this.ymin = origin.y;
        this.ymax = origin.y + height;
    }

    static copy(quad) {
        let origin = new Point(quad.origin.x, quad.origin.y);
        let width = quad.width;
        let height = quad.height;

        return new Quad(origin, width, height);
    }

    intersects(quad) {
        if (this.xmin < quad.xmax && this.xmax > quad.xmin &&
            this.ymin < quad.ymax && this.ymax > quad.ymin) return true;
        return false;
    }

    containsPoint(point) {
        return (point.x <= this.xmax && point.x >= this.xmin) &&
            (point.y <= this.ymax && point.y >= this.ymin);
    }
}
