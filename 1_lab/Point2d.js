const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

class Point2d {
    constructor(coordX, coordY) {
        this._coordX = this._validateX(coordX);
        this._coordY = this._validateY(coordY);
    }

    get coordX() {
        return this._coordX;
    }

    set coordX(value) {
        this._coordX = this._validateX(value);
    }

    get coordY() {
        return this._coordY;
    }

    set coordY(value) {
        this._coordY = this._validateY(value);
    }

    _validateX(value) {
        if (value < 0 || value > SCREEN_WIDTH) {
            throw new Error(`X coordinate must be between 0 and ${SCREEN_WIDTH}`);
        }
        return value;
    }

    _validateY(value) {
        if (value < 0 || value > SCREEN_HEIGHT) {
            throw new Error(`Y coordinate must be between 0 and ${SCREEN_HEIGHT}`);
        }
        return value;
    }

    equals(otherPoint) {
        if (!(otherPoint instanceof Point2d)) return false;
        return this.coordX === otherPoint.coordX && this.coordY === otherPoint.coordY;
    }

    toString() {
        return `Point2d(${this.coordX}, ${this.coordY})`;
    }

}

module.exports = { Point2d, SCREEN_WIDTH, SCREEN_HEIGHT };