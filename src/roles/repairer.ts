import {intel} from '../config/intel';

export const repairer = {
  run: (creep: Creep) => {
    const home = creep.memory.home;

    // if creep is trying to repair something but has no energy left
    if (creep.memory.repairing && creep.carry.energy === 0) {
      creep.say('⛏️', true);
      // switch state
      creep.memory.repairing = false;
    } else if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
      // switch state
      creep.say('💊', true);
      creep.memory.repairing = true;
    }

    // if creep is supposed to repair something
    if (creep.memory.repairing) {
      // find closest structure with less than max hits
      // Exclude walls because they have way too many max hits and would keep
      // our repairers busy forever. We have to find a solution for that later.
      const structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        // the second argument for findClosestByPath is an object which takes
        // a property called filter which can be a function
        // we use the arrow operator to define it
        filter: (s: any) => {
          return s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART;
        }
      });

      // if we find one
      if (structure !== null) {
        creep.say('💊', true);
        // try to repair it, if it is out of range
        if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 0});
        }
      }
      // // if we can't fine one
      // else {
      //     // look for construction sites
      //     roleBuilder.run(creep);
      // }
    } else {
      // find closest container
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 100;
        }
      });
      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(container, {reusePath: 0});
        }
      } else {
        // find closest source
        const source = Game.getObjectById(intel.rooms[home].sources.secondary.id) as Source; // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(source, {reusePath: 0});
        }
      }
    }
  }
};
