import {Repair} from '../../actions/Repair';
import {StorageModel} from '../../models/StorageModel';
import {RemoteRole} from './RemoteRole';

/**
 * 장거리 수리공
 */
export class RemoteRepairer extends RemoteRole {
  public targetFlag: Flag;
  private repair: Repair;
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep);
    this.targetFlag = Game.flags.remoteRepairTarget;
    this.repair = new Repair(creep);
    this.storageModel = new StorageModel(creep);
  }

  public run() {
    // Attack
    const attackTarget = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (attackTarget) {
      if (this.creep.attack(attackTarget) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(attackTarget, {reusePath: 1});
      }
      return true;
    }

    if (!this.creep.memory.ready) {
      this.storageModel.withdraw('energy');
    }

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

    if (!this.creep.memory.ready && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.ready = true;
    }

    if (this.creep.memory.ready) {
      if (!this.creep.memory.arrived) {
        this.creep.moveTo(this.targetFlag, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
      } else {
        return this.repair.room();
      }
    }

    if (this.creep.memory.ready && !this.creep.memory.arrived && this.creep.pos.isEqualTo(this.targetFlag.pos)) {
      this.creep.say('도착!', true);
      this.creep.memory.arrived = true;
    }
  }
}
