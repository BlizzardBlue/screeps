var coreIntel = require('core.intel');

var storageModel = require('model.storage');
var repairWork = require('work.repair');
var navigationUtil = require('util.navigation');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        let targetFlag = Game.flags.pioneerTarget;
        let targetRoom = targetFlag.room;

        // Attack
        const attackTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (attackTarget) {
            if(creep.attack(attackTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(attackTarget);
            }
            return;
        }

        if (!creep.memory.ready) {
            storageModel.withdraw(creep, 'energy');
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
        
        if (!creep.memory.ready && creep.carry.energy === creep.carryCapacity) {
            creep.memory.ready = true;
        }
        
        if (creep.memory.ready) {
            if (!creep.memory.arrived) {
                creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                repairWork.room(creep);
                return;
            }
        }
        
        if (creep.memory.ready && !creep.memory.arrived && creep.pos.isEqualTo(targetFlag.pos)) {
            creep.say('도착!', true);
            creep.memory.arrived = true;
        }

        // // if creep is trying to repair something but has no energy left
        // if (creep.memory.repairing && creep.carry.energy == 0) {
        //     creep.say('⛏️', true);
        //     // switch state
        //     creep.memory.repairing = false;
        // }
        // // if creep is harvesting energy but is full
        // else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
        //     // switch state
        //     creep.memory.repairing = true;
        // }

        // // if creep is supposed to repair something
        // if (creep.memory.repairing) {
        //     // find closest structure with less than max hits
        //     // Exclude walls because they have way too many max hits and would keep
        //     // our repairers busy forever. We have to find a solution for that later.
        //     var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //         // the second argument for findClosestByPath is an object which takes
        //         // a property called filter which can be a function
        //         // we use the arrow operator to define it
        //         filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        //     });

        //     // if we find one
        //     if (structure != undefined) {
        //         creep.say('💊', true);
        //         // try to repair it, if it is out of range
        //         if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
        //             // move towards it
        //             creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
        //         }
        //     }
        // }
        //     // if creep is supposed to get energy
        // else {
        //     // find closest container
        //     let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //         filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 100
        //     });
        //     // if one was found
        //     if (container != undefined) {
        //         // try to withdraw energy, if the container is not in range
        //         if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             // move towards it
        //             creep.moveTo(container);
        //         }
        //     }
        //     else {
        //         // find closest source
        //         var source = coreIntel.room1.sources.secondary.object; // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        //         // try to harvest energy, if the source is not in range
        //         if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        //             // move towards it
        //             creep.moveTo(source);
        //         }
        //     }
        // }
    }
};