import {intel} from '../config/intel';
// import {storageModel} from '../models/storage';

export const upgrader = {
  run: (creep: Creep) => {

    if (creep.memory.upgrading && creep.carry.energy === 0) {
      creep.memory.upgrading = false;
      creep.say('⛏️', true);
    }
    if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚛️', true);
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {
      // find closest container
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => { // TODO: any 개선
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 500;
        }
      });
      // if one was found
      if (container !== undefined) {
        // try to withdraw energy, if the container is not in range
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      } else {
        // find closest source
        const source = Game.getObjectById(intel.rooms.home.sources.primary.id) as Source; // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      }
      // var source = Game.getObjectById(intel.rooms.home.sources.primary.id);
      // if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
      //     creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      // }
    }
  }
};
