const _ = require('lodash');

import {intel} from '../../config/intel';
import {StorageModel} from '../../models/StorageModel';
import {RemoteRole} from './RemoteRole';

export class RemoteHarvester extends RemoteRole {
  public targetFlag: Flag;
  public targetRoomName: string;
  public targetRoomIntel: any;
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep);
    this.targetFlag = Game.flags.remoteRepairTarget;
    this.targetRoomName = intel.expansion.mining.rooms[0];
    this.targetRoomIntel = intel.rooms[this.targetRoomName];
    this.storageModel = new StorageModel(creep);
  }

  public run() {
    const entrance = intel.rooms[this.home].entrance.roomPosition;

    // Attack
    const attackTarget = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (attackTarget) {
      if (this.creep.attack(attackTarget) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(attackTarget, {reusePath: 4});
      }
      return;
    }

    if (this.creep.ticksToLive < 50) {
      this.creep.memory.mining = false;
      this.creep.say(`☠️ (${this.creep.ticksToLive})`, true);
      if (this.creep.room.name !== intel.rooms[this.home].name) {
        return this.creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
      } else {
        if (_.sum(this.creep.carry) > 0) {
          this.storageModel.transfer();
        } else {
          console.log(`[Creep] Suicide: ${this.creep.name}`);
          this.creep.suicide();
        }
      }
    }

    if (this.creep.memory.mining && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.mining = false;
      this.creep.say(this.storageModel.transferText, true);
    }

    if (!this.creep.memory.mining && this.creep.carry.energy === 0) {
      this.creep.memory.mining = true;
      this.creep.say('⚠️⛏️출장간다!', true);
    }

    if (this.creep.memory.mining) {
      if (this.creep.room.name !== this.targetRoomIntel.name) {
        this.creep.moveTo(this.targetRoomIntel.sources.primary.roomPosition, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
      } else {
        const source = Game.getObjectById(this.targetRoomIntel.sources.primary.id) as Source;
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
        }
      }
    }

    if (!this.creep.memory.mining) {
      if (this.creep.room.name !== intel.rooms[this.home].name) {
        this.creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
      } else {
        this.storageModel.transfer();
      }
    }
  }
}
