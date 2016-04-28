export default class Point {

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    increaseX(amount) {
        this.x += amount;
    }

    decreaseX(amount) {
        this.x -= amount;
    }

    increaseY(amount) {
        this.y += amount;
    }

    decreaseY(amount) {
        this.y -= amount;
    }
}
