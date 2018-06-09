import {intel} from '../../config/intel';
import {StorageModel} from '../../models/StorageModel';
import {GeneralRole} from './GeneralRole';

export class Pioneer extends GeneralRole {
  public targetFlag: Flag;
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep);
    this.targetFlag = Game.flags.pioneerTarget;
    this.storageModel = new StorageModel(creep);
  }

  public run() {
    const entrance = intel.rooms[this.home].entrance.roomPosition;

    // Attack
    // const attackTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    // if (attackTarget) {
    //   if (creep.attack(attackTarget) === ERR_NOT_IN_RANGE) {
    //     creep.moveTo(attackTarget, {reusePath: 1});
    //   }
    //   return;
    // }

    if (this.creep.carry.energy === 0) {
      if (this.creep.memory.arrived && this.creep.memory.ready) {
        // find closest source
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (!source) {
          this.creep.memory.ready = false;
          this.creep.memory.arrived = false;
          this.creep.memory.harvesting = false;
        } else {
          this.creep.say('현지조달!', true);
          this.creep.memory.ready = false;
          this.creep.memory.harvesting = true;
        }
      }
    }

    if (this.creep.memory.harvesting && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.ready = true;
      this.creep.memory.harvesting = false;
    }

    if (this.creep.memory.harvesting) {
      const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
        return this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
      }
    }

    if (this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.ready = true;
    }

    if (this.creep.memory.ready && !this.creep.memory.arrived && this.creep.pos.isEqualTo(this.targetFlag.pos)) {
      this.creep.say('도착!', true);
      this.creep.memory.arrived = true;
    }

    if (!this.creep.memory.ready && !this.creep.memory.harvesting) {
      if (this.creep.room.name !== intel.rooms[this.home].name) {
        this.creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
      } else {
        this.storageModel.withdraw('energy');
      }
    }

    if (this.creep.memory.ready) {
      if (!this.creep.memory.arrived) {
        this.creep.moveTo(this.targetFlag, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
      } else {
        const target: ConstructionSite = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (target) {
          if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
          }
        }
      }
    }
  }
}
