const _ = require('lodash');

import {StorageModel} from '../models/StorageModel';

export const cleaner = {
  run: (creep: Creep) => {
    const storageModel: StorageModel = new StorageModel(creep);
    if (creep.memory.cleaning && _.sum(creep.carry) === creep.carryCapacity) {
      creep.memory.cleaning = false;
      creep.say(storageModel.transferText, true);
    }

    if (!creep.memory.cleaning && _.sum(creep.carry) === 0) {
      creep.memory.cleaning = true;
      creep.say('🛁', true);
    }

    if (creep.memory.cleaning) {
      const tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
        filter: (tombstone: any) => { // TODO: any 개선
          return _.sum(tombstone.store) > 0;
        }
      });
      const droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

      if (tombstone) {
        for (const resourceType of Object.keys(tombstone.store)) {
          if (creep.withdraw(tombstone, resourceType as ResourceConstant) === ERR_NOT_IN_RANGE) {
            creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 0});
          }
        }
      } else if (creep.pickup(droppedResource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 0});
      } else if (!tombstone && !droppedResource) {
        storageModel.transfer();
      }
    }

    if (!creep.memory.cleaning) {
      creep.say(storageModel.transferText, true);
      const storageStatus = storageModel.getStatus();
      if (storageStatus) {
        storageModel.transfer();
      } else {
        const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s: any) => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity // TODO: any 대신 제대로 타이핑
        });
        if (container) {
          if (creep.transfer(container, 'energy') === ERR_NOT_IN_RANGE) {
            creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 0});
          }
        }
      }
    }
  }
};
