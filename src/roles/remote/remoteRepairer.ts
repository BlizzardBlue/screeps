// import {intel} from '../config/intel';
import {Repair} from '../../actions/repair';
import {StorageModel} from '../../models/StorageModel';

export const remoteRepairer = {
  run: (creep: Creep) => {
    const storageModel: StorageModel = new StorageModel(creep);
    const repair: Repair = new Repair(creep);
    const targetFlag = Game.flags.remoteRepairTarget; // TODO: 개선
    // const targetRoom = targetFlag.room;

    // Attack
    const attackTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (attackTarget) {
      if (creep.attack(attackTarget) === ERR_NOT_IN_RANGE) {
        creep.moveTo(attackTarget, {reusePath: 1});
      }
      return;
    }

    if (!creep.memory.ready) {
      storageModel.withdraw('energy');
    }

    if (creep.carry.energy === 0) {
      if (creep.memory.arrived && creep.memory.ready) {
        // find closest source
        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (!source) {
          creep.memory.ready = false;
          creep.memory.arrived = false;
          creep.memory.harvesting = false;
        } else {
          creep.say('현지조달!', true);
          creep.memory.ready = false;
          creep.memory.harvesting = true;
        }
      }
    }

    if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
      creep.memory.ready = true;
      creep.memory.harvesting = false;
    }

    if (creep.memory.harvesting) {
      const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        return;
      }
    }

    if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.ready = true;
    }

    if (!creep.memory.ready && creep.carry.energy === creep.carryCapacity) {
      creep.memory.ready = true;
    }

    if (creep.memory.ready) {
      if (!creep.memory.arrived) {
        creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
      } else {
        repair.room();
        return;
      }
    }

    if (creep.memory.ready && !creep.memory.arrived && creep.pos.isEqualTo(targetFlag.pos)) {
      creep.say('도착!', true);
      creep.memory.arrived = true;
    }
  }
};
