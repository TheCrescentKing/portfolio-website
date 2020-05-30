const SPEED_MULTIPLIER = 0.01;
const SCALE = 1;

// Init Solar System object

let solarSystem = {
  celestialBodies: {
    sun: new CelestialBody("Sun", new Point(width/2, height/2), 50*SCALE, 1, '#ff0')
  }
}

// Init planets from planets.js
// Calculate max distance so that planets (Pluto) don't dissapear on the bottom of the screen
// Remember to take Sun's size into account
let maxDistance = height/2 - planets['pluto'].size*SCALE - solarSystem.celestialBodies.sun.size;
// Divide maximum distance between number of planets
let distanceBetweenPlanets = maxDistance/Object.keys(planets).length;

// Initiate starting distance to be size of sun + distanceBetweenPlanets
let distance = solarSystem.celestialBodies.sun.size + distanceBetweenPlanets;

for (let key in planets){

  let planet = planets[key];

  let currentPlanetObj = new CelestialBody(planets[key].name,
    new Point(width/2 + distance, solarSystem.celestialBodies.sun.y),
    planet.size*SCALE,
    planet.speed*SPEED_MULTIPLIER,
    planet.colour,
    solarSystem.celestialBodies[planet.binding]);


  if (planets[key].satellites){
    currentPlanetObj.satellites = initSatellites(currentPlanetObj, planets[key].satellites);
  }

  solarSystem.celestialBodies[key] = currentPlanetObj;
  distance += distanceBetweenPlanets;
}

// function initImage(name){
//   let imgTag = '<img src="'+ name.toLowerCase() + '" id="celestialImage" alt="' + name + '"/>';
//
// }

// Init satellites if present in planet object
function initSatellites(planet, satellites){

  let satelliteCollection = {};

  for (let key in satellites){

    let satellite = satellites[key];

    let currentSatellite = new CelestialBody(satellite.name,
      new Point(
        planet.x + satellite.position,
        planet.y + satellite.position
      ),
      satellite.size*SCALE,
      satellite.speed*SPEED_MULTIPLIER,
      satellite.colour,
      planet);

      satelliteCollection[key] = currentSatellite;
    }

    return satelliteCollection;
}



// Animation Loop

function loop() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  solarSystem.celestialBodies.sun.draw(ctx);

  for (let key in solarSystem.celestialBodies){
    let planet = solarSystem.celestialBodies[key];
    planet.draw(ctx);
    planet.update();
  }

  requestAnimationFrame(loop);
}

loop();
