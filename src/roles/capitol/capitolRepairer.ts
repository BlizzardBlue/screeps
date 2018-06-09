const _ = require('lodash');

import {Repair} from '../../actions/repair';
import {intel} from '../../config/intel';
import {StorageModel} from '../../models/StorageModel';
import {Navigate} from '../../utils/Navigate';

export const capitolRepairer = {
  run: (creep: Creep) => {
    const storageModel: StorageModel = new StorageModel(creep);
    const repair: Repair = new Repair(creep);
    const navigate: Navigate = new Navigate(creep);
    const capitolRoomName: string = intel.alias.capitol.roomName;

    // 인베이더가 침입하면 집으로 도망감
    if (Memory.rooms[capitolRoomName].invader) {
      creep.memory.retreat = true;
      if (creep.room.name === creep.memory.home) {
        // TODO: 모듈화
        creep.say('♻️', true);
        const spawn: StructureSpawn = creep.room.find(FIND_MY_SPAWNS)[0];
        const renewResult = spawn.recycleCreep(creep);
        switch (renewResult) {
          case OK:
            console.log(`[Spawn | ${spawn.name}] Recycled: ${creep.name}`);
            break;
          case ERR_BUSY:
            creep.moveTo(spawn, {reusePath: 1});
            break;
          case ERR_NOT_IN_RANGE:
            creep.moveTo(spawn, {reusePath: 1});
            break;
          default:
            creep.say(`Err: ${renewResult}`);
        }
        return true;
      } else {
        creep.say('🆘', true);
        return navigate.fromCapitoltoHome();
      }
    } else {
      creep.memory.retreat = false;
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
      // TODO: 모듈화
      // find closest container
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300;
        }
      });
      // if one was found
      if (!_.isNull(container)) {
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

    if (!creep.memory.ready && creep.carry.energy === creep.carryCapacity) {
      creep.memory.ready = true;
    }

    if (creep.memory.ready) {
      if (!creep.memory.arrived) {
        return navigate.toCapitol();
      } else {
        return repair.room();
      }
    }
  }
};
