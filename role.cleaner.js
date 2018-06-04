var storageModel = require('model.storage');

module.exports = {
    run: function(creep) {
        if (creep.memory.cleaning && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.cleaning = false;
            creep.say(storageModel.transferText, true);
        }
        
        if (!creep.memory.cleaning && _.sum(creep.carry) == 0) {
            creep.memory.cleaning = true;
            creep.say('🛁', true);
        }
        
        if (creep.memory.cleaning) {
            let tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: t => _.sum(t.store) > 0
            });
            let droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

            if (tombstone) {
                for(let resourceType in tombstone.store) {
                    if (creep.withdraw(tombstone, resourceType) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            } else if (creep.pickup(droppedResource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else if (!tombstone && !droppedResource) {
                storageModel.transfer(creep);
            }
        }
        
        if (!creep.memory.cleaning) {
            storageModel.transfer(creep);
            creep.say(storageModel.transferText, true);
        }
    }
};
