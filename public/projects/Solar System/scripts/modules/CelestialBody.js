class CelestialBody{
  constructor(name, position, size, speedRadians, colour, celestialBinding, satellites){
    this._name = name;
    this._position = position;
    this._speed = speedRadians;
    this._colour = colour;
    this._size = size;
    this._celestialBinding = celestialBinding;
    this._satellites = satellites;

    // Load image
    this._imgLoaded = {isLoaded: false};
    this._img = new Image();
    this._img.src = "images/" + this.name.toLowerCase() + ".png"; // Try to load image
    let imgLoadedObj = this._imgLoaded;
    this._img.onload = function () {imgLoadedObj.isLoaded = true;};
  }

  get name(){
    return this._name;
  }

  set name(name){
    this._name = name;
  }

  get position(){
    return this._position;
  }

  set position(position){
    this._position = position;
  }

  get speed(){
    return this._speed;
  }

  set speed(speedRadians){
    this._speed = speedRadians;
  }

  get size(){
    return this._size;
  }

  set size(size){
    this._size = size;
  }

  get colour(){
    return this._colour;
  }

  set colour(colour){
    this._colour = colour;
  }

  get x(){
    return this._position.x;
  }

  get y(){
    return this._position.y;
  }

  get celestialBinding(){
    return this._celestialBinding;
  }

  set celestialBinding(celestialBinding){
    this._celestialBinding = celestialBinding;
  }

  get satellites(){
    return this._satellites;
  }

  set satellites(satellites){
    this._satellites = satellites;
  }

  updateSatellites(positionChange){
    let satellites = this.satellites;
    for (let key in satellites){
      satellites[key].position = satellites[key].position.add(positionChange);
      satellites[key].update();
    }
  }

  draw(ctx){

    if(this._imgLoaded.isLoaded){
      let topLeftCornerX = this.x - this.size/2;
      let topLeftCornerY = this.y - this.size/2;
      // Have to correct size otherwise images are half the size of the drawn versions
      ctx.drawImage(this._img, topLeftCornerX, topLeftCornerY, this.size, this.size);
    }else{
      ctx.beginPath();
      ctx.fillStyle = this.colour;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }


    if(this.satellites){
      for (let key in this.satellites){
        this.satellites[key].draw(ctx);
      }
    }
  }

  update(){
    // If we have moons we have to record the position before the planet rotates and correct the moons position
    // Otherwise the moons would not travel with the planet and would get further away from the planet (even if they would still rotate around it)
    let beforePosition = 0;
    if(this.satellites){
      beforePosition = this.position;
    }

    if(this.celestialBinding){
      let radians = degToRad(this.speed);
      let celestialBindingX = this.celestialBinding.x;
      let celestialBindingY = this.celestialBinding.y;
      this.position = this.position.rotate(celestialBindingX, celestialBindingY, radians);
    }

    if(this.satellites){
      let positionChange = this.position.subtract(beforePosition);
      this.updateSatellites(positionChange);
    }
  }
}
