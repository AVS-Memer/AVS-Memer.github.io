export class Point {
  constructor(inputs) {
    this.x = inputs.x || 0;
    this.y = inputs.y || 0;
  }
  translate(inputs) {
    this.x += inputs.x || 0;
    this.y += inputs.y || 0;
  }
}
export class Line {
  constructor(inputs) {
    this.pt1 = inputs.pt1 || new Point({x: 0, y: 0});
    this.pt2 = inputs.pt2 || new Point({x: 0, y: 0});
  }
  update() {
    this.lSlope = (this.pt2.y - this.pt1.y) / (this.pt2.x - this.pt1.x);
    this.lLength = Math.sqrt((this.pt2.x - this.pt1.x) ** 2 + (this.pt2.y - this.pt1.y) ** 2);
    this.lAngle = Math.atan2(this.pt2.y - this.pt1.y, this.pt2.x - this.pt1.x);
  }
  translate(inputs) {
    this.pt1.x += inputs.x || 0;
    this.pt1.y += inputs.y || 0;
    this.pt2.x += inputs.x || 0;
    this.pt2.y += inputs.y || 0;
  }
}
export class Side extends Line {
  constructor(inputs) {super(inputs)}
  update() {super.update()}
}
export class Polygon {
  constructor(inputs) {
    inputs.pts.forEach((pt) => {
      pt.x = pt.x || 0;
      pt.y = pt.y || 0;
      if (this.pts.include(pt)) {inputs.pts.remove(pt)} else {this.pts.push(pt)}
    });
    for (let i = 0; i < this.pts.length; i++) {this.sides[i] = new Side({pt1: this.pts[i], pt2: this.pts[i+1] || this.pts[0]});}
    this.updatePolygon();
  }
  update() {
    this.sides.forEach((side) => {side.updateSide();});
    for (let i = 0; i < this.sides.length; i++) {this.pts[i].angle = Math.abs(this.sides[i].lSlope - (this.sides[i+1].lSlope || this.sides[0].lSlope));}
    this.perimeter = this.sides.reduce((acc, side) => acc + side.lLength, 0);
  }
  dialate(inputs) {
    inputs.dialationPt.x = inputs.dialationPt.x || 0;
    inputs.dialationPt.y = inputs.dialationPt.y || 0;
    inputs.scale = inputs.scale || 1;
    this.pts.forEach((pt) => {
      pt.x = (pt.x - inputs.dialationPt.x) * inputs.scale + inputs.dialationPt.x;
      pt.y = (pt.y - inputs.dialationPt.y) * inputs.scale + inputs.dialationPt.y;
    });
    this.update();
  }
  rotate(inputs) {
    inputs.rotationPt.x = inputs.rotationPt.x || 0;
    inputs.rotationPt.y = inputs.rotationPt.y || 0;
    inputs.angle = inputs.angle || 0;
    this.pts.forEach((pt) => {
      pt.x = (pt.x - inputs.rotationPt.x) * Math.cos(inputs.angle) - (pt.y - inputs.rotationPt.y) * Math.sin(inputs.angle) + inputs.rotationPt.x;
      pt.y = (pt.y - inputs.rotationPt.y) * Math.cos(inputs.angle) + (pt.x - inputs.rotationPt.x) * Math.sin(inputs.angle) + inputs.rotationPt.y;
    });
    this.update();
  }
  translate(inputs) {
    inputs.x = inputs.x || 0;
    inputs.y = inputs.y || 0;
    this.pts.forEach((pt) => {pt.translate(inputs)});
  }
}
export class Triangle extends Polygon {
  constructor(inputs) {if (inputs.pts.length == 3) {super(inputs)} else {throw new Error("Invalid number of points for a triangle")}}
  update() {
    super.update();
    this.sideType = (this.sides[0].lLength == this.sides[1].lLength && this.sides[0].lLength == this.sides[2].lLength)?"Equilateral":((this.sides[0].lLength == this.sides[1].lLength || this.sides[0].lLength == this.sides[2].lLength || this.sides[1].lLength == this.sides[2].lLength)?"Isosceles":"Scalene");
    this.angleType = (Math.max(this.pts[0].angle, this.pts[1].angle, this.pts[2].angle) < 90)?"Acute":((Math.max(this.pts[0].angle, this.pts[1].angle, this.pts[2].angle) === 90)?"Right":"Obtuse");
    this.area = Math.sqrt(this.perimeter/2 * (this.perimeter/2 - this.sides[0].lLength) * (this.perimeter/2 - this.sides[1].lLength) * (this.perimeter/2 - this.sides[2].lLength));
    this.alts[0] = 2 * this.area / this.sides[0].lLength;
    this.alts[1] = 2 * this.area / this.sides[1].lLength;
    this.alts[2] = 2 * this.area / this.sides[2].lLength;
    this.inradius = 2 * this.area / this.perimeter;
    this.circumradius = (this.sides[0].lLength * this.sides[1].lLength * this.sides[2].lLength) / Math.sqrt((this.sides[0].lLength + this.sides[1].lLength + this.sides[2].lLength) * (this.sides[0].lLength + this.sides[1].lLength - this.sides[2].lLength) * (this.sides[0].lLength - this.sides[1].lLength + this.sides[2].lLength) * (this.sides[1].lLength - this.sides[0].lLength + this.sides[2].lLength));
  }
  dialate(inputs) {super.dialate(inputs)}
  rotate(inputs) {super.rotate(inputs)}
  translate(inputs) {super.translate(inputs)}
}
export class Quadrilateral extends Polygon {
  constructor(inputs) {if (inputs.pts.length == 4) {super(inputs)} else {throw new Error("Invalid number of points for a quadrilateral")}}
  update() {
    super.update();
    if (this.sides[0].lSlope == this.sides[2].lSlope || this.sides[1].lSlope == this.sides[3].lSlope) {
      if (this.sides[0].lSlope == this.sides[2].lSlope && this.sides[1].lSlope == this.sides[3].lSlope) {
        if (this.sides[0].lLength == this.sides[1].lLength && this.sides[0].lLength == this.sides[2].lLength && this.sides[0].lLength == this.sides[3].lLength) {
          if (this.pts[0].angle == this.pts[1].angle && this.pts[0].angle == this.pts[2].angle && this.pts[0].angle == this.pts[3].angle && this.pts[0].angle == Math.PI/2) {this.type = "Square"} else {this.type = "Rhombus"}
        } else if (this.pts[0].angle == this.pts[1].angle && this.pts[0].angle == this.pts[2].angle && this.pts[0].angle == this.pts[3].angle && this.pts[0].angle == Math.PI/2) {this.type = "Rectangle"} else {this.type = "Parallelogram"}
      } else {this.type = "Trapezoid"}
    } else {this.type = "Quadrilateral"}
    this.area = Math.sqrt((this.perimeter/2 - this.sides[0].lLength) * (this.perimeter/2 - this.sides[1].lLength) * (this.perimeter/2 - this.sides[2].lLength) * (this.perimeter/2 - this.sides[3].lLength));
  }
  dialate(inputs) {super.dialate(inputs)}
  rotate(inputs) {super.rotate(inputs)}
  translate(inputs) {super.translate(inputs)}
}
export class Vector {
  constructor(inputs) {
    this.i = inputs.i || 0;
    this.j = inputs.j || 0;
    this.vSlope = this.j/this.i;
    this.vMagnitude = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
    this.vAngle = Math.atan2(this.j, this.i);
  }
  update() {
    this.vSlope = this.j/this.i;
    this.vMagnitude = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
    this.vAngle = Math.atan2(this.j, this.i);
  }
  add(vector) {
    this.i += vector.i;
    this.j += vector.j;
    this.update();
  }
  subtract(vector) {
    this.i -= vector.i;
    this.j -= vector.j;
    this.update();
  }
  multiply(number) {
    this.i *= number;
    this.j *= number;
    this.update();
  }
  divide(number) {
    this.i /= number;
    this.j /= number;
    this.update();
  }
  dotProduct(vector) {return this.i * vector.i + this.j * vector.j}
  crossProduct(vector) {return this.vMagnitude * vector.vMagnitude * Math.sin(Math.abs(this.vAngle - vector.vAngle))}
}