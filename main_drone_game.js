// main_drone_game.js
var event = require( './event' );
var drone = require('./drone_controls.js');
var collision = require('./drone_collision.js');
var play = require('play-audio')

initData = {
	maxHeight: 4000,
	velocityX: 0.1,
	velocityY: 0.1,
  dataEventTimeout: 1,
}

drone.Init(initData)
	.then(function(result) {
		return drone.GetData('battery')
	})
	.then(function(value) {
		console.log(value);
		return drone.TakeOff()
	})
	// .then(function(result) {
    // collision.CheckX();
    // collision.CheckY();
    // return drone.Calibrate()
	// })
	.then (function() {
    collision.CheckX();
    collision.CheckY();
    drone.Land(50000);
	});

 event.on('collision', function(type) {
    if (type == 'front') {
      console.log('Front Collision');
      drone.Move('front');
    }
    else if (type == 'back') {
      console.log('Back Collision');
      drone.Move('back');
    }
        
    if (type == 'left') {
      console.log('Left Collision');
      drone.Move('right');
    }
    else if (type == 'right') {
      console.log('Right Collision');
      drone.Move('left');
    }
 });