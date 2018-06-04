var coreIntel = require('core.intel');

var storageModel = require('model.storage');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('📦', true);
        }
        
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('⛏️', true);
        }
        
        if(creep.memory.harvesting) {
            // find closest storage
            let storageStatus = storageModel.getStatus(creep);
            if (storageStatus.energy > 0) {
                storageModel.withdraw(creep, 'energy');
                return;
            }

            // find closest container
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 250
            });
            // if one was found
            if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (creep.withdraw(container, 'energy') == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                var source = coreIntel.room1.sources.primary.object; // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(source);
                }
            }
            // var source = coreIntel.room1.sources.primary.object;
            // if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
        // } else if (creep.carry.energy == creep.carryCapacity) {
        //     creep.moveTo(34, 23);
        }
        
        if(!creep.memory.harvesting) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    // return (structure.structureType == STRUCTURE_EXTENSION ||
                    //     structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.moveTo(36,25);
            }
        }
    }
};

module.exports = roleHarvester;