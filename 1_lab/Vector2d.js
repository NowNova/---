const { Point2d } = require('./Point2d');

class Vector2d {
    constructor(vectorX, vectorY) {
        if (vectorX instanceof Point2d && vectorY instanceof Point2d) {
            this.vectorX = vectorY.coordX - vectorX.coordX;
            this.vectorY = vectorY.coordY - vectorX.coordY;
        } 
        else {
            this.vectorX = vectorX;
            this.vectorY = vectorY;
        }
    }

    getComponent(index) {
        if (index === 0) return this.vectorX;
        if (index === 1) return this.vectorY;
        throw new Error('Index out of range');
    }

    setComponent(index, value) {
        if (index === 0) this.vectorX = value;
        else if (index === 1) this.vectorY = value;
        else throw new Error('Index out of range');
    }

    *[Symbol.iterator]() {
        yield this.vectorX;
        yield this.vectorY;
    }

    equals(otherVector) {
        if (!(otherVector instanceof Vector2d)) return false;
        return this.vectorX === otherVector.vectorX && this.vectorY === otherVector.vectorY;
    }

    toString() {
        return `Vector2d(${this.vectorX}, ${this.vectorY})`;
    }

    get magnitude() {
        return Math.sqrt(this.vectorX * this.vectorX + this.vectorY * this.vectorY);
    }

    add(otherVector) {
        return new Vector2d(this.vectorX + otherVector.vectorX, this.vectorY + otherVector.vectorY);
    }

    subtract(otherVector) {
        return new Vector2d(this.vectorX - otherVector.vectorX, this.vectorY - otherVector.vectorY);
    }

    multiplyByScalar(scalar) {
        return new Vector2d(this.vectorX * scalar, this.vectorY * scalar);
    }

    divideByScalar(scalar) {
        if (scalar === 0) throw new Error('Division by zero');
        return new Vector2d(this.vectorX / scalar, this.vectorY / scalar);
    }

    dotProduct(otherVector) {
        return this.vectorX * otherVector.vectorX + this.vectorY * otherVector.vectorY;
    }

    crossProduct(otherVector) {
        return this.vectorX * otherVector.vectorY - this.vectorY * otherVector.vectorX;
    }

    static calculateDotProduct(firstVector, secondVector) {
        return firstVector.dotProduct(secondVector);
    }

    static calculateCrossProduct(firstVector, secondVector) {
        return firstVector.crossProduct(secondVector);
    }
}

module.exports = Vector2d;