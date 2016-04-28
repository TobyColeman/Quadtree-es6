import Quad from '../math/quad';
import Point from '../math/point';

export default class QuadTree {
    constructor(bounds, maxObjects, maxLevels, level = 0) {
        this.bounds = bounds;
        this.maxObjects = maxObjects;

        this.maxLevels = maxLevels;
        this.level = level;

        this.objects = [];
        this.children = [];
    }

    set northWest(tree) {
        this.children[0] = tree;
    }

    set northEast(tree) {
        this.children[1] = tree;
    }

    set southWest(tree) {
        this.children[2] = tree;
    }

    set southEast(tree) {
        this.children[3] = tree;
    }

    get northWest() {
        return this.children[0];
    }

    get northEast() {
        return this.children[1];
    }

    get southWest() {
        return this.children[2];
    }

    get southEast() {
        return this.children[3];
    }


    insert(obj) {
        // if we have a sub-tree
        if (this.northWest !== undefined) {
            return this._getChild(obj.point).insert(obj);
        }

        // check to see the point is within bounds of the tree
        if (!this.bounds.containsPoint(obj.point)) {
            return false;
        }

        this.objects.push(obj);

        // split the tree if there are too many objects at this level
        if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
            if (this.northWest === undefined) {
                this._subdivide();
            }

            // add all the objects in this node to its children
            this.objects.forEach(obj => {
                this._getChild(obj.point).insert(obj);
            });

            this.objects = [];
        }
        return true;
    }

    queryRange(range, selector = null, cb = null) {
        let pointsInRange = [];

        if (!this.bounds.intersects(range)) {
            return pointsInRange;
        }

        this.objects.forEach(obj => {
            if (range.containsPoint(obj.point)) {
                pointsInRange.push(obj[selector] || obj);
            }
        });

        if (this.northWest !== undefined) {
            this.children.forEach(child => {
                pointsInRange = pointsInRange.concat(child.queryRange(range, selector));
            });
        }

        if (cb) {
            return cb(pointsInRange);
        }

        return pointsInRange;
    }

    clear() {
        this.objects = [];

        this.children.forEach(child => {
            if (child !== undefined) {
                child.clear();
            }
        });

        this.children = [];
    }

    _subdivide() {
        let nextLevel = this.level + 1;
        let subWidth = Math.round(this.bounds.width / 2);
        let subHeight = Math.round(this.bounds.height / 2);
        let x = Math.round(this.bounds.xmin);
        let y = Math.round(this.bounds.ymin);

        let nwBounds = new Quad(new Point(x, y), subWidth, subHeight);
        let neBounds = new Quad(new Point(x + subWidth, y), subWidth, subHeight);
        let swBounds = new Quad(new Point(x, y + subHeight), subWidth, subHeight);
        let seBounds = new Quad(new Point(x + subWidth, y + subHeight), subWidth, subHeight);

        this.northWest = new QuadTree(nwBounds, this.maxObjects, this.maxLevels, nextLevel);
        this.northEast = new QuadTree(neBounds, this.maxObjects, this.maxLevels, nextLevel);
        this.southWest = new QuadTree(swBounds, this.maxObjects, this.maxLevels, nextLevel);
        this.southEast = new QuadTree(seBounds, this.maxObjects, this.maxLevels, nextLevel);
    }

    _getChild(point) {
        if (this.northWest.bounds.containsPoint(point)) return this.northWest;
        if (this.northEast.bounds.containsPoint(point)) return this.northEast;
        if (this.southWest.bounds.containsPoint(point)) return this.southWest;
        if (this.southEast.bounds.containsPoint(point)) return this.southEast;
    }
}
