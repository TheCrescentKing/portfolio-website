function degToRad(degrees){
  return degrees * Math.PI / 180;
}

class Point{
  constructor(x, y){
    this._x = x;
    this._y = y;
  }

  get x(){
    return this._x;
  }

  set x(x){
    this._x = x;
  }

  get y(){
    return this._y;
  }

  set y(y){
    this._y = y;
  }

  add(point){
    let a = this.x + point.x;
    let b = this.y + point.y;
    return new Point(a,b);
  }

  subtract(point){
    let a = this.x - point.x;
    let b = this.y - point.y;
    return new Point(a,b);
  }

  multiply(lambda){
    let a = 0;
    let b = 0;
    // Test if scalar
    if(typeof(lambda) == "number"){
      a = this.x * lambda;
      b = this.y * lambda;
      return new Point(a,b);
    }else { // Assume it's a Point and perform complex number multiplication
      a = (this.x * lambda.x) - (this.y * lambda.y);
      b = (this.x * lambda.y) + (this.y * lambda.x);
    }
    return new Point(a,b);
  }

  rotate(centerX, centerY, theta){
    let translated = this.subtract(new Point(centerX, centerY));
    let multiplied = translated.multiply(new Point(Math.cos(theta), Math.sin(theta)));
    return multiplied.add(new Point(centerX, centerY));
  }
}
