const _ = require('lodash');

import {StorageModel} from '../../models/StorageModel';
import {GeneralRole} from './GeneralRole';

/**
 * 스폰, 익스텐션, 타워에 에너지 공급하는 크립
 */
export class Harvester extends GeneralRole {
  private storageModel: StorageModel;

  constructor(creep: Creep) {
    super(creep, {
      targetTicksToLiveOnDispatch: 200
    });
    this.storageModel = new StorageModel(creep);
  }

  public run() {
    // 파견지에 도착하면 메모리의 arrived값 true로 변경
    if (this.dispatch && this.creep.pos.inRangeTo(new RoomPosition(21, 29, this.dispatchSite), 4)) {
      this.creep.say('도착!', true);
      this.creep.memory.arrived = true;
    }

    // 파견근무용 크립일경우 파견지로 이동
    if (this.dispatch && !this.arrived) {
      this.creep.say(`${this.dispatchSite}로 가는 중!`, true);
      return this.navigate.toDispatchSite();
    }

    // 파견지에서 수명 연장
    if (this.dispatch && this.creep.ticksToLive < this.creepSettings.targetTicksToLiveOnDispatch) {
      this.creep.memory.renewing = true;
    } else if (this.dispatch && this.creep.ticksToLive > 1400) {
      this.creep.memory.renewing = false;
    }
    if (this.dispatch && this.creep.memory.renewing) {
      this.creep.say('수명 연장 비활성화 됨', true); // TODO: 파견지에 스토리지 생기고 나면, 수명 연장 다시 활성화
      // return this.renewAtDispatchSite();
    }

    if (this.creep.memory.harvesting && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.harvesting = false;
      this.creep.say('📦', true);
    }

    if (!this.creep.memory.harvesting && this.creep.carry.energy === 0) {
      this.creep.memory.harvesting = true;
      this.creep.say('⛏️', true);
    }

    if (this.creep.memory.harvesting) {
      // find closest storage
      const storageStatus = this.storageModel.getStatus();
      if (storageStatus.energy > 0) {
        return this.storageModel.withdraw('energy');
      }

      // find closest container
      const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 250 // TODO: any 대신 제대로 타이핑
      });
      // if one was found
      if (!_.isNull(container)) {
        // try to withdraw energy, if the container is not in range
        if (this.creep.withdraw(container, 'energy') === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      } else {
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        this.creep.say(`${this.creep.harvest(source)}`);
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          return this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      }
      // var source = coreIntel.room1.sources.primary.object;
      // if(this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
      //     this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      // }
      // } else if (this.creep.carry.energy === this.creep.carryCapacity) {
      //     this.creep.moveTo(34, 23);
    }

    if (!this.creep.memory.harvesting) {
      const target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure: any) => { // TODO: any 대신 제대로 타이핑
          // return (structure.structureType === STRUCTURE_EXTENSION ||
          //     structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
          return (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });
      if (target) {
        if (this.creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
        }
      } else {
        this.creep.moveTo(36, 25);
      }
    }
  }
}
