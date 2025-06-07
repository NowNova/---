const { Point2d, SCREEN_WIDTH, SCREEN_HEIGHT } = require('./Point2d');
const Vector2d = require('./Vector2d');

try {
    const pointA = new Point2d(100, 200);
    const pointB = new Point2d(300, 400);
    const pointC = new Point2d(100, 200);

    console.log('Point2d demonstration:');
    console.log('pointA:', pointA.toString());
    console.log('pointB:', pointB.toString());
    console.log('pointC:', pointC.toString());
    console.log('pointA equals pointB:', pointA.equals(pointB));
    console.log('pointA equals pointC:', pointA.equals(pointC));

} catch (error) {
    console.error('Point2d error:', error.message);
}

const vectorU = new Vector2d(1, 2);
const vectorV = new Vector2d(3, 4);
const vectorW = new Vector2d(new Point2d(0, 0), new Point2d(5, 5));

console.log('\nVector2d demonstration:');
console.log('vectorU:', vectorU.toString());
console.log('vectorV:', vectorV.toString());
console.log('vectorW (from points):', vectorW.toString());


console.log('vectorU + vectorV:', vectorU.add(vectorV).toString());
console.log('vectorV - vectorU:', vectorV.subtract(vectorU).toString());
console.log('vectorU * 3:', vectorU.multiplyByScalar(3).toString());
console.log('vectorV / 2:', vectorV.divideByScalar(2).toString());


console.log('vectorU dot vectorV:', vectorU.dotProduct(vectorV));
console.log('vectorU cross vectorV:', vectorU.crossProduct(vectorV));
console.log('Vector2d.dot(vectorU, vectorV):', Vector2d.calculateDotProduct(vectorU, vectorV));
console.log('Vector2d.cross(vectorU, vectorV):', Vector2d.calculateCrossProduct(vectorU, vectorV));


console.log('vectorU[0]:', vectorU.getComponent(0));
console.log('vectorU[1]:', vectorU.getComponent(1));
console.log('Iterating vectorV:');
for (const component of vectorV) {
    console.log(component);
}


console.log('|vectorW|:', vectorW.magnitude);