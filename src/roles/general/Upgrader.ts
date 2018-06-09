import {intel} from '../../config/intel';
import {StorageModel} from '../../models/StorageModel';
import {GeneralRole} from './GeneralRole';

/**
 * RCL 업그레이더
 */
export class Upgrader extends GeneralRole {
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep);
    this.storageModel = new StorageModel(creep);
  }

  public run() {
    if (this.creep.memory.upgrading && this.creep.carry.energy === 0) {
      this.creep.memory.upgrading = false;
      this.creep.say('⛏️', true);
    }
    if (!this.creep.memory.upgrading && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.upgrading = true;
      this.creep.say('⚛️', true);
    }

    if (this.creep.memory.upgrading) {
      if (this.creep.upgradeController(this.creep.room.controller) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(this.creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
      }
    } else {
      // if (this.creep.room.name === 'W3N7') { // TODO: 임시 대책. 나중에 바꿀 것.
      //   return storageModel.withdraw('energy');
      // }
      // find closest container
      const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => { // TODO: any 개선
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 500;
        }
      });
      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      } else {
        // find closest source
        const source = Game.getObjectById(intel.rooms[this.home].sources.primary.id) as Source; // var source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      }
      // var source = Game.getObjectById(intel.rooms[home].sources.primary.id);
      // if(this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
      //     this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
      // }
    }
  }
}
