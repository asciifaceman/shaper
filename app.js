//
// Shaper
// Inspired by Peter F. Hamilton's Void Trilogy - With Love
//

// System Vars
var vm = "";
var system = {
  version: 0.1,
  interval: 66.6664,
  // 16.6666 = 60 ticks/second
  // 33.3332 = 30 ticks/second
  // 66.6664 = 15 ticks/second
  // 133.3328 = 7.5 ticks/second
  // 266.6656 = 3.75 ticks/second
  // 533.3312 = 1.875 ticks/second
  // 1000 = 1 tick/second
}

var player = {
  name: "Apprentice",
  gold: 0,
}

var genistars = {
  egg: ["eggs", 0, 0, 0], // 0name, 1owned, 2%shaped, 3value
  def: ["Default", 1, 0, 0],
  mouse: ["Ge-mouse", 0, 0, 0],
}

var lastUpdate = new Date().getTime();
if (!store.has('lastUpdate')) store.set('lastUpdate', new Date().getTime());

///
/// SYSTEM CONFIGURATION
///

// Timer Config
GlobalTimer = function() {
  this.timer = setInterval((function() {this.update();}).bind(this), system['interval']);

  this.update = function() {
    var thisUpdate = new Date().getTime();
    var diff = thisUpdate - store.get('lastUpdate', new Date().getTime());
    var intervalsPassed = Math.round(diff / system['interval']);

    gameLoop(intervalsPassed);
    
    store.set('lastUpdate', thisUpdate);
    store.set('genistars', genistars);
  }
};

function gameLoop(intervalsPassed) {
  // Main Game Loop. Variable is
  // how many ticks have passed since the gameLoop last ran
  // this is normally 1, increment by it don't multiply

  growEggs(intervalsPassed);
  updateVue();
}

function updateVue() {
  vm.eggPercent = genistars.egg[2];
}

//
// Game Logic
//
function growEggs(intervalsPassed) {
  for (var i = 1; i <= intervalsPassed; i++) {
    genistars['egg'][2] += 1;
    if (genistars['egg'][2] >= 100) {
      genistars['egg'][2] = 0;
      genistars['egg'][1]++; // Adding one for now, add more at a time later
    }    
  }
}

//
// VUES
//
function initVue() {
  vm = new Vue ({
    el: '#vueStable',
    data: {
      eggPercent: genistars.egg[2],
      genistar: genistars
    }

    // Vue.set(vm, key, val) to update page
  });
  vh = new Vue ({
    el: '#vueHead',
    data: {
      sys: system
    }
  });
  console.log(vm.genistar);
}

//
// On Load
//
$( document ).ready(function() {
  engine = new GlobalTimer();
  initVue();
  console.log("v" + system['version'] + " Ready!");
})