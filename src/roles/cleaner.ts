const _ = require('lodash');

import {storageModel} from '../models/storage';

export const cleaner = {
  run: (creep: any) => { // TODO: any 대신 크립
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
