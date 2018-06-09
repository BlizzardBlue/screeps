import {intel} from '../../config/intel';
import {StorageModel} from '../../models/StorageModel';
import {GeneralRole} from './GeneralRole';

/**
 * 스폰, 익스텐션, 타워에 에너지 공급하는 크립
 */
export class Harvester extends GeneralRole {
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep);
    this.storageModel = new StorageModel(creep);
  }

  public run() {
    if (this.creep.memory.harvesting && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.harvesting = false;
      this.creep.say('📦', true);
    }

    if (!this.creep.memory.harvesting && this.creep.carry.energy === 0) {
      this.creep.memory.harvesting = true;
      this.creep.say('⛏️', true);
    }

    if (this.creep.memory.harvesting) {
      // find closest storage
      const storageStatus = this.storageModel.getStatus();
      if (storageStatus.energy > 0) {
        this.creep.say('a');
        return this.storageModel.withdraw('energy');
      }

      // find closest container
      this.creep.say('b');
      const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 250 // TODO: any 대신 제대로 타이핑
      });
      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (this.creep.withdraw(container, 'energy') === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      } else {
        const source = Game.getObjectById(intel.rooms[this.home].sources.primary.id) as Source; // var source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(source, {reusePath: 1});
        }
      }
      // var source = coreIntel.room1.sources.primary.object;
      // if(this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
      //     this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      // }
      // } else if (this.creep.carry.energy === this.creep.carryCapacity) {
      //     this.creep.moveTo(34, 23);
    }

    if (!this.creep.memory.harvesting) {
      const target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure: any) => { // TODO: any 대신 제대로 타이핑
          // return (structure.structureType === STRUCTURE_EXTENSION ||
          //     structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
          return (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });
      if (target) {
        if (this.creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
        }
      } else {
        this.creep.moveTo(36, 25);
      }
    }
  }
}
