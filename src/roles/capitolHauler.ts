const _ = require('lodash');

import {intel} from '../config/intel';
import {StorageModel} from '../models/StorageModel';
import {Navigate} from '../utils/Navigate';

export const capitolHauler = {
  run: (creep: Creep) => {
    const storageModel: StorageModel = new StorageModel(creep);
    const navigate: Navigate = new Navigate(creep);
    const capitolRoomName: string = intel.alias.capitol.roomName;

    // 인베이더나 적군이 들어오면 집으로 도망감
    if (creep.room.name === capitolRoomName) {
      creep.memory.retreat = Game.rooms[capitolRoomName].memory.invader || Game.rooms[capitolRoomName].memory.invader;
    }

    // TODO: 모듈화
    // 수명이 550틱 이하로 남았으면 recycle
    if (creep.ticksToLive <= 550 && creep.memory.return && creep.room.name === 'W3N7') {
      creep.say('♻️', true);
      const spawn2: StructureSpawn = Game.spawns.Spawn2;
      const renewResult = spawn2.recycleCreep(creep);
      switch (renewResult) {
        case OK:
          console.log(`[Spawn|${spawn2.name}] Recycled: ${creep.name}`);
          break;
        case ERR_BUSY:
          creep.moveTo(spawn2, {reusePath: 1});
          break;
        case ERR_NOT_IN_RANGE:
          creep.moveTo(spawn2, {reusePath: 1});
          break;
        default:
          creep.say(`Err: ${renewResult}`);
      }
      return true;
    }

    // 캐피톨로 이동
    if (!creep.memory.return && !creep.memory.arrived) {
      return navigate.toCapitol();
    }

    // 들고있는 에너지가 꽉 차면 집으로 귀환
    if (!creep.memory.return && creep.carry.energy === creep.carryCapacity) {
      creep.memory.return = true;
      creep.memory.arrived = false;
      creep.memory.waypointArrived = false;
      creep.memory.waypoint2Arrived = false;
    } else if (creep.memory.return) {
      navigate.fromCapitoltoHome();
    }

    // 집에 돌아오면 스토리지에 에너지 저장
    if (creep.memory.return && creep.room.name === creep.memory.home) {
      storageModel.transfer();
    }

    // 에너지 다 넣으면 다시 캐피톨로
    if (creep.room.name === creep.memory.home && creep.memory.return && creep.carry.energy === 0) {
      creep.memory.return = false;
    }

    // 캐피톨 도착하면 떨어진 에너지 / 컨테이너 에너지 수거
    if (!creep.memory.return && creep.memory.arrived) {
      // TODO: 모듈화
      const droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: resource => resource.amount > 400
      });
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 450;
        }
      });
      if (!_.isNull(droppedResource)) {
        if (creep.pickup(droppedResource) === ERR_NOT_IN_RANGE) {
          creep.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      } else if (!_.isNull(container)) {
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container, {reusePath: 1});
        }
      }
    }
  }
};
