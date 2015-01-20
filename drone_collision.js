// drone_collision.js
var event = require( './event' );
var drone = require('./drone_controls.js');

var collisionVel = 50;
var activeAxisX = 'front';
var activeAxisY = 'left';

module.exports = {
	CheckX: function() {
    event.on('data_change', function(data) {
      console.log(data);
      if (data.velX > collisionVel && activeAxisX == 'front') {
        activeAxisX = 'back';
        event.emit('collision', 'front'); 
      }
      else if (data.velX < -collisionVel && activeAxisX == 'back') {
        activeAxisX = 'front';
        event.emit('collision', 'back');
      }
    });
	},

	CheckY: function() {
		event.on('data_change', function(data) {
      if (data.velY > collisionVel && activeAxisY == 'left') {
        activeAxisY = 'right';
        event.emit('collision', 'left'); 
      }
      else if (data.velY < -collisionVel && activeAxisY == 'right') {
        activeAxisY = 'left';
        event.emit('collision', 'right'); 
      }
    });
	}
}