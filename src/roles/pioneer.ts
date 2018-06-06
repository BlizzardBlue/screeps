import {intel} from '../config/intel';
import {storageModel} from '../models/storage';

export const pioneer = {
  run: (creep: Creep) => {
    const targetFlag = Game.flags.pioneerTarget;
    const entrance = intel.rooms.home.entrance.roomPosition;

    // Attack
    const attackTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (attackTarget) {
      if (creep.attack(attackTarget) === ERR_NOT_IN_RANGE) {
        creep.moveTo(attackTarget);
      }
      return;
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
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        return;
      }
    }

    if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.ready = true;
    }

    if (creep.memory.ready && !creep.memory.arrived && creep.pos.isEqualTo(targetFlag.pos)) {
      creep.say('도착!', true);
      creep.memory.arrived = true;
    }

    if (!creep.memory.ready && !creep.memory.harvesting) {
      if (creep.room.name !== intel.rooms.home.name) {
        creep.moveTo(entrance, {visualizePathStyle: {stroke: '#ffaa00'}});
      } else {
        storageModel.withdraw(creep, 'energy');
      }
    }

    if (creep.memory.ready) {
      if (!creep.memory.arrived) {
        creep.moveTo(targetFlag, {visualizePathStyle: {stroke: '#ffaa00'}});
      } else {
        const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (buildTargets.length) {
          if (creep.build(buildTargets[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
      }
    }
  }
};
