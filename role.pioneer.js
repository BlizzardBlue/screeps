var coreIntel = require('core.intel');
var coreSettings = require('core.settings');

var storageModel = require('model.storage');
var roleBuilder = require('role.builder');

var rolePioneer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        let targetFlag = Game.flags.pioneerTarget;
        const entrance = coreIntel.rooms.home.entrance.roomPosition;

        // Attack
        const attackTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (attackTarget) {
            if(creep.attack(attackTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(attackTarget);
            }
            return;
        }

        if (creep.carry.energy === 0) {
            if (creep.memory.arrived && creep.memory.ready) {
                // find closest source
                let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (!source) {
                    creep.memory.ready = false;
                    creep.memory.arrived = false;
                    creep.memory.harvesting = false;
                } else {
                    creep.say('현지조달!', true);
                    creep.memory.ready = false;
                    creep.memory.harvesting = true;
                }
            }
        }
        
        if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
            creep.memory.ready = true;
            creep.memory.harvesting = false;
        }

        if (creep.memory.harvesting) {
            let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                return;
            }
        }

        if (creep.carry.energy === creep.carryCapacity) {
            creep.memory.ready = true;
        }

        if (creep.memory.ready && !creep.memory.arrived && creep.pos.isEqualTo(targetFlag.pos)) {
            creep.say('도착!', true);
            creep.memory.arrived = true;
        }
        
        if (!creep.memory.ready && !creep.memory.harvesting) {
            if (creep.room.name !== coreIntel.rooms.home.name) {
                creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                storageModel.withdraw(creep, 'energy');
            }
        }

        if (creep.memory.ready) {
            if (!creep.memory.arrived) {
                creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                let buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(buildTargets.length) {
                    if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = rolePioneer;