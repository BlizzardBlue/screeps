import {intel} from '../config/intel';
import {StorageModel} from '../models/StorageModel';

export const harvester = {
  run: (creep: Creep) => {
    const storageModel: StorageModel = new StorageModel(creep);
    const home = creep.memory.home;

    if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
      creep.memory.harvesting = false;
      creep.say('📦', true);
    }

    if (!creep.memory.harvesting && creep.carry.energy === 0) {
      creep.memory.harvesting = true;
      creep.say('⛏️', true);
    }

    if (creep.memory.harvesting) {
      // find closest storage
      const storageStatus = storageModel.getStatus();
      if (storageStatus.energy > 0) {
        storageModel.withdraw('energy');
        return;
      }

      // find closest container
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 250 // TODO: any 대신 제대로 타이핑
      });
      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (creep.withdraw(container, 'energy') === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 0});
        }
      } else {
        const source = Game.getObjectById(intel.rooms[home].sources.primary.id) as Source; // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(source, {reusePath: 0});
        }
      }
      // var source = coreIntel.room1.sources.primary.object;
      // if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
      //     creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      // }
      // } else if (creep.carry.energy === creep.carryCapacity) {
      //     creep.moveTo(34, 23);
    }

    if (!creep.memory.harvesting) {
      const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure: any) => { // TODO: any 대신 제대로 타이핑
          // return (structure.structureType === STRUCTURE_EXTENSION ||
          //     structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
          return (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });
      if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 0});
        }
      } else {
        creep.moveTo(36, 25);
      }
    }
  }
};
