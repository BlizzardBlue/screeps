import {intel} from '../config/intel';
import {StorageModel} from '../models/StorageModel';
import {Navigate} from '../utils/Navigate';

export const capitolBuilder = {
  run: (creep: Creep) => {
    const home = creep.memory.home;
    const storageModel: StorageModel = new StorageModel(creep);
    const navigate: Navigate = new Navigate(creep);

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
      // TODO: 모듈화
      // find closest container
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 100;
        }
      });
      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(container, {reusePath: 1});
        }
      } else {
        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          return creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      }
    }

    if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.ready = true;
    }

    // 출발 전 에너지 채우기
    if (!creep.memory.ready && !creep.memory.harvesting) {
      if (creep.room.name === intel.rooms[home].name) {
        storageModel.withdraw('energy');
      }
    }

    if (creep.memory.ready) {
      if (!creep.memory.arrived) {
        return navigate.toCapitol();
      } else {
        const target: ConstructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (target) {
          if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
          }
        }
      }
    }
  }
};
