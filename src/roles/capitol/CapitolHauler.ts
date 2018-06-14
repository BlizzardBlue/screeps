const _ = require('lodash');

import {intel} from '../../config/intel';
import {StorageModel} from '../../models/StorageModel';
import {CapitolRole} from './CapitolRole';

export class CapitolHauler extends CapitolRole {
  public capitolRoomName: string;
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep);
    this.capitolRoomName = intel.alias.capitol.roomName;
    this.storageModel = new StorageModel(creep);
  }

  public run() {
    // 인베이더가 침입하면 집으로 도망감
    // if (Memory.rooms[this.capitolRoomName].invader) {
    //   creep.memory.underEvacuation = true;
    //   if (creep.room.name === creep.memory.home) {
    //     // TODO: 모듈화
    //     creep.say('♻️', true);
    //     const spawn: StructureSpawn = creep.room.find(FIND_MY_SPAWNS)[0];
    //     const renewResult = spawn.recycleCreep(creep);
    //     switch (renewResult) {
    //       case OK:
    //         console.log(`[Spawn | ${spawn.name}] Recycled: ${creep.name}`);
    //         break;
    //       case ERR_BUSY:
    //         creep.moveTo(spawn, {reusePath: 4});
    //         break;
    //       case ERR_NOT_IN_RANGE:
    //         creep.moveTo(spawn, {reusePath: 4});
    //         break;
    //       default:
    //         creep.say(`Err: ${renewResult}`);
    //     }
    //     return true;
    //   } else {
    //     creep.say('🆘', true);
    //     return navigate.fromCapitoltoHome();
    //   }
    // } else {
    //   creep.memory.underEvacuation = false;
    // }

    // TODO: 모듈화
    // 수명이 550틱 이하로 남았으면 recycle
    if (this.creep.ticksToLive <= 500 && this.creep.room.name === 'W1N7' || this.creep.ticksToLive <= 500 && this.creep.room.name === 'W3N7') {
      this.creep.say('♻️', true);
      const spawn: StructureSpawn = this.creep.room.find(FIND_MY_SPAWNS)[0];
      const renewResult = spawn.recycleCreep(this.creep);
      switch (renewResult) {
        case OK:
          console.log(`[Spawn | ${spawn.name}] Recycled: ${this.creep.name}`);
          break;
        case ERR_BUSY:
          this.creep.moveTo(spawn, {reusePath: 4});
          break;
        case ERR_NOT_IN_RANGE:
          this.creep.moveTo(spawn, {reusePath: 4});
          break;
        default:
          this.creep.say(`Err: ${renewResult}`);
      }
      return true;
    }

    // 캐피톨로 이동
    if (!this.creep.memory.return && !this.creep.memory.arrived) {
      return this.navigate.toCapitol();
    }

    // 들고있는 에너지가 꽉 차면 집으로 귀환
    if (!this.creep.memory.return && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.return = true;
      this.creep.memory.arrived = false;
      this.creep.memory.waypointArrived = false;
      this.creep.memory.waypoint2Arrived = false;
    } else if (this.creep.memory.return) {
      this.navigate.fromCapitoltoHome();
    }

    // 집에 돌아오면 스토리지에 에너지 저장
    if (this.creep.memory.return && this.creep.room.name === this.creep.memory.home) {
      this.storageModel.transfer();
    }

    // 에너지 다 넣으면 다시 캐피톨로
    if (this.creep.room.name === this.creep.memory.home && this.creep.memory.return && this.creep.carry.energy === 0) {
      this.creep.memory.return = false;
      this.creep.memory.arrived = false;
    }

    // 캐피톨 도착하면 떨어진 에너지 / 컨테이너 에너지 수거
    if (!this.creep.memory.return && this.creep.memory.arrived) {
      // TODO: 모듈화
      const droppedResource = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: resource => resource.amount > 400
      });
      const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 450;
        }
      });
      if (!_.isNull(droppedResource)) {
        if (this.creep.pickup(droppedResource) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
        }
      } else if (!_.isNull(container)) {
        if (this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(container, {reusePath: 4});
        }
      }
    }
  }
}
