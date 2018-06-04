var coreIntel = require('core.intel');

module.exports = {
    goHome: function(creep) {
        const entrance = coreIntel.rooms.home.entrance.roomPosition;
        if (creep.room.name !== coreIntel.rooms.home.name) {
            creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};
