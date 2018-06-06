const _ = require('lodash');

export const storageModel = {
  transferText: '🕋📦',
  withdrawText: '🕋🔻',

  transfer: (creep: Creep) => {
    const storage: any = creep.pos.findClosestByPath(FIND_STRUCTURES as any, { // TODO: any 대신 제대로 타이핑
      filter: (structure: any) => { // TODO: any 대신 제대로 타이핑
        if (structure.structureType === STRUCTURE_STORAGE) {
          const storage: any = structure; // TODO: any 개선
          return _.sum(storage.store) < storage.storeCapacity;
        } else {
          return undefined;
        }
      }
    });
    if (storage) {
      for (const resourceType of Object.keys(creep.carry)) { // TODO: 타이핑
        if (creep.transfer(storage, resourceType as ResourceConstant) === ERR_NOT_IN_RANGE) {
          creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      }
    }
  },

  withdraw: (creep: any, resourceType: string) => { // TODO: amount parameter 지원, creep 타이핑 any 대신 대책 마련
    const storage: StructureStorage = creep.pos.findClosestByPath(FIND_STRUCTURES as any, {
      filter: (s: any) => { // TODO: any 대신 제대로 타이핑
        return s.structureType === STRUCTURE_STORAGE && _.sum(s.store) > 0;
      }
    });
    if (storage) {
      switch (resourceType) {
        case 'energy':
          if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) { // TODO: amount parameter 지원
            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
          }
          break;
        default:
          throw new Error('Not defined resourceType');
      }
    }
  },

  getStatus: (creep: any) => { // TODO: creep 타이핑 any 대신 대책 마련
    const storage: StructureStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s: any) => {
        return s.structureType === STRUCTURE_STORAGE;
      }
    });
    if (storage) {
      return storage.store;
    } else {
      throw new Error('No storage nearby');
    }
  }
};
