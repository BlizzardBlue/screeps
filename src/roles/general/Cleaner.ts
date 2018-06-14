const _ = require('lodash');

import {StorageModel} from '../../models/StorageModel';
import {GeneralRole} from './GeneralRole';

/**
 * 땅에 떨어진 리소스 + 무덤 청소부
 */
export class Cleaner extends GeneralRole {
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep);
    this.storageModel = new StorageModel(creep);
  }

  public run() {
    if (this.creep.memory.cleaning && _.sum(this.creep.carry) === this.creep.carryCapacity) {
      this.creep.memory.cleaning = false;
      this.creep.say(this.storageModel.transferText, true);
    }

    if (!this.creep.memory.cleaning && _.sum(this.creep.carry) === 0) {
      this.creep.memory.cleaning = true;
      this.creep.say('🛁', true);
    }

    if (this.creep.memory.cleaning) {
      const tombstone = this.creep.pos.findClosestByPath(FIND_TOMBSTONES, {
        filter: (tombstone: any) => { // TODO: any 개선
          return _.sum(tombstone.store) > 0;
        }
      });
      const droppedResource = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: resource => resource.amount > 100
      });

      if (tombstone) {
        for (const resourceType of Object.keys(tombstone.store)) {
          if (this.creep.withdraw(tombstone, resourceType as ResourceConstant) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
          }
        }
      } else if (this.creep.pickup(droppedResource) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
      } else if (!tombstone && !droppedResource) {
        this.storageModel.transfer();
      }
    }

    if (!this.creep.memory.cleaning) {
      this.creep.say(this.storageModel.transferText, true);
      const storageStatus = this.storageModel.getStatus();
      if (storageStatus) {
        this.storageModel.transfer();
      } else {
        const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s: any) => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity // TODO: any 대신 제대로 타이핑
        });
        if (container) {
          if (this.creep.transfer(container, 'energy') === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
          }
        }
      }
    }
  }
}
