const _ = require('lodash');

import {StorageModel} from '../../models/StorageModel';
import {GeneralRole} from './GeneralRole';

/**
 * 다른 방에서 에너지 수거해오는 크립
 */
export class Hauler extends GeneralRole {
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep, {
      targetTicksToLiveOnDispatch: 100
    });
    this.storageModel = new StorageModel(creep);
  }

  // TODO: Hauler의 dispatchSite는 '내가 점령하지 않은 방'임. 이 부분 고려해서 문제될거 없는지 다시 생각해보기.
  public run() {
    try {
      if (this.dispatch) {
        const dispatchSiteUnderAttack: boolean = Memory.rooms[this.creep.memory.dispatchSite].invader;
        if (dispatchSiteUnderAttack) {
          this.creep.say('🆘', true);
          return this.navigate.toHome();
        }
      }

      // 파견지에 도착하면 메모리의 dispatchSiteArrived true로 변경
      if (this.dispatch
        && !this.dispatchSiteArrived
        && this.creep.room.name === this.creep.memory.dispatchSite
        && _.inRange(this.creep.pos.x, 2, 47)
        && _.inRange(this.creep.pos.y, 2, 47)) {
        this.creep.say('도착!', true);
        this.creep.memory.dispatchSiteArrived = true;
      }

      // 수명이 얼마 남지 않으면 집에서 리사이클
      if (this.creep.ticksToLive < this.creepSettings.targetTicksToLiveOnDispatch) {
        return this.recycleAtHome();
      }

      // 파견근무용 크립일경우 파견지로 이동
      if (this.dispatch && !this.dispatchSiteArrived) {
        this.creep.say(`${this.dispatchSite}로 파견가요`, true);
        return this.navigate.toDispatchSite();
      }

      // 들고있는 에너지가 꽉 차면 집으로 복귀
      if (!this.creep.memory.return && this.creep.carry.energy === this.creep.carryCapacity) {
        this.creep.memory.return = true;
      }
      if (this.creep.memory.return) {
        // 집으로 복귀
        this.navigate.toHome();
      }

      // 집에 돌아오면 스토리지에 에너지 저장
      if (this.creep.memory.return && this.creep.room.name === this.creep.memory.home) {
        this.storageModel.transfer();
      }

      // 에너지 다 넣으면 다시 일하러
      if (this.creep.room.name === this.creep.memory.home && this.creep.memory.return && this.creep.carry.energy === 0) {
        this.creep.memory.dispatchSiteArrived = false;
        this.creep.memory.return = false;
      }

      // 수거지역 도착하면 땅에 떨어진 에너지+컨테이너 에너지 수거
      if (!this.creep.memory.return && this.creep.room.name === this.creep.memory.dispatchSite) {
        // TODO: 모듈화
        const droppedResource = this.creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
          filter: resource => resource.amount > 400
        });
        const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s: any) => {
            return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 200;
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
    } catch (err) {
      this.creep.say(err);
    }
  }
}
