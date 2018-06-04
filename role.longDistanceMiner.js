var coreIntel = require('core.intel');

var storageModel = require('model.storage');

module.exports = {
    run: function(creep) {
        const targetRoomId = coreIntel.expansion.mining.rooms[0];
        const targetRoomIntel = coreIntel.rooms[targetRoomId];
        let targetRoom = targetRoomIntel.object;
        const entrance = coreIntel.rooms.home.entrance.roomPosition;
        
        // Attack
        const attackTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (attackTarget) {
            if(creep.attack(attackTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(attackTarget);
            }
            return;
        }
        
        if(creep.ticksToLive < 50) {
            creep.memory.mining = false;
            creep.say('☠️ (' + creep.ticksToLive + ')', true);
            if (creep.room.name !== coreIntel.rooms.home.name) {
                creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}});
                return;
            } else {
                if (_.sum(creep.carry) > 0) {
                    storageModel.transfer(creep);
                } else {
                    console.log('Suicide: ' + creep.name);
                    creep.suicide();
                }
            }
        }

        if(creep.memory.mining && creep.carry.energy == creep.carryCapacity) {
            creep.memory.mining = false;
            creep.say(storageModel.transferText, true);
        }
        
        if(!creep.memory.mining && creep.carry.energy == 0) {
            creep.memory.mining = true;
            creep.say('⚠️⛏️출장간다!', true);
        }
        
        if(creep.memory.mining) {
            if (creep.room.name !== targetRoomIntel.name) {
                creep.moveTo(targetRoomIntel.sources.primary.roomPosition, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                let source = targetRoomIntel.sources.primary.object;
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        
        if(!creep.memory.mining) {
            if (creep.room.name !== coreIntel.rooms.home.name) {
                creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                storageModel.transfer(creep);
            }
        }
    }
};
