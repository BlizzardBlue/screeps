import {intel} from '../../config/intel';
import {StorageModel} from '../../models/StorageModel';
import {GeneralRole} from './GeneralRole';

/**
 * RCL 업그레이더
 */
export class Upgrader extends GeneralRole {
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

    if (this.creep.memory.upgrading && this.creep.carry.energy === 0) {
      this.creep.memory.upgrading = false;
      this.creep.say('⛏️', true);
    }
    if (!this.creep.memory.upgrading && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.upgrading = true;
      this.creep.say('⚛️', true);
    }

    if (this.creep.memory.upgrading) {
      if (this.creep.upgradeController(this.creep.room.controller) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(this.creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
      }
    } else {
      // if (this.creep.room.name === 'W3N7') { // TODO: 임시 대책. 나중에 바꿀 것.
      //   return storageModel.withdraw('energy');
      // }
      // find closest container
      const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => { // TODO: any 개선
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 500;
        }
      });
      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      } else {
        // find closest source
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          return this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      }
      // var source = Game.getObjectById(intel.rooms[home].sources.primary.id);
      // if(this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
      //     this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
      // }
    }
  }
}
