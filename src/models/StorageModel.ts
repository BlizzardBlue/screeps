const _ = require('lodash');

export class StorageModel {
  public transferText: string = '🕋📦';
  public withdrawText: string = '🕋🔻';
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public transfer(): any {
    const storage = this.creep.pos.findClosestByPath(FIND_STRUCTURES as any, { // TODO: any 대신 제대로 타이핑
      filter: (structure: any) => { // TODO: any 대신 제대로 타이핑
        if (structure.structureType === STRUCTURE_STORAGE) {
          const storage: any = structure; // TODO: any 개선
          return _.sum(storage.store) < storage.storeCapacity;
        } else {
          return undefined;
        }
      }
    }) as StructureStorage;
    if (storage) {
      for (const resourceType of Object.keys(this.creep.carry)) { // TODO: 타이핑
        if (this.creep.transfer(storage, resourceType as ResourceConstant) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      }
    }
  }

  public withdraw(resourceType: string): any { // TODO: amount parameter 지원, creep 타이핑 any 대신 대책 마련
    const storage = this.creep.pos.findClosestByPath(FIND_STRUCTURES as any, {
      filter: (s: any) => { // TODO: any 대신 제대로 타이핑
        return s.structureType === STRUCTURE_STORAGE && _.sum(s.store) > 0;
      }
    }) as StructureStorage;
    if (storage) {
      switch (resourceType) {
        case 'energy':
          if (this.creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) { // TODO: amount parameter 지원
            this.creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
          }
          break;
        default:
          throw new Error('Not defined resourceType');
      }
    }
  }

  public getStatus(): any { // TODO: creep 타이핑 any 대신 대책 마련
    const storage = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s: any) => {
        return s.structureType === STRUCTURE_STORAGE;
      }
    }) as StructureStorage;
    if (storage) {
      return storage.store;
    } else {
      return false;
    }
  }
}
