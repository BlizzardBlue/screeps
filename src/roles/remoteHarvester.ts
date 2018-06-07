const _ = require('lodash');

import {intel} from '../config/intel';
import {StorageModel} from '../models/StorageModel';

export const remoteHarvester = {
  run: (creep: Creep) => {
    const home = creep.memory.home;
    const storageModel: StorageModel = new StorageModel(creep);
    const targetRoomId = intel.expansion.mining.rooms[0];
    const targetRoomIntel = intel.rooms[targetRoomId];
    // const targetRoom = targetRoomIntel.object;
    const entrance = intel.rooms[home].entrance.roomPosition;

    // Attack
    const attackTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (attackTarget) {
      if (creep.attack(attackTarget) === ERR_NOT_IN_RANGE) {
        creep.moveTo(attackTarget, {reusePath: 0});
      }
      return;
    }

    if (creep.ticksToLive < 50) {
      creep.memory.mining = false;
      creep.say(`☠️ (${creep.ticksToLive})`, true);
      if (creep.room.name !== intel.rooms[home].name) {
        creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 0});
        return;
      } else {
        if (_.sum(creep.carry) > 0) {
          storageModel.transfer();
        } else {
          console.log(`Suicide: ${creep.name}`);
          creep.suicide();
        }
      }
    }

    if (creep.memory.mining && creep.carry.energy === creep.carryCapacity) {
      creep.memory.mining = false;
      creep.say(storageModel.transferText, true);
    }

    if (!creep.memory.mining && creep.carry.energy === 0) {
      creep.memory.mining = true;
      creep.say('⚠️⛏️출장간다!', true);
    }

    if (creep.memory.mining) {
      if (creep.room.name !== targetRoomIntel.name) {
        creep.moveTo(targetRoomIntel.sources.primary.roomPosition, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 0});
      } else {
        const source = Game.getObjectById(targetRoomIntel.sources.primary.id) as Source;
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 0});
        }
      }
    }

    if (!creep.memory.mining) {
      if (creep.room.name !== intel.rooms[home].name) {
        creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 0});
      } else {
        storageModel.transfer();
      }
    }
  }
};
