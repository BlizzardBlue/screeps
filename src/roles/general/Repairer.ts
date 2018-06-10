import {intel} from '../../config/intel';
import {GeneralRole} from './GeneralRole';

/**
 * 룸 수리공
 */
export class Repairer extends GeneralRole {
  constructor(creep: Creep) {
    super(creep, {
      targetTicksToLiveOnDispatch: 200
    });
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

    // if creep is trying to repair something but has no energy left
    if (this.creep.memory.repairing && this.creep.carry.energy === 0) {
      this.creep.say('⛏️', true);
      // switch state
      this.creep.memory.repairing = false;
    } else if (!this.creep.memory.repairing && this.creep.carry.energy === this.creep.carryCapacity) {
      // switch state
      this.creep.say('💊', true);
      this.creep.memory.repairing = true;
    }

    // if creep is supposed to repair something
    if (this.creep.memory.repairing) {
      // find closest structure with less than max hits
      // Exclude walls because they have way too many max hits and would keep
      // our repairers busy forever. We have to find a solution for that later.
      const structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        // the second argument for findClosestByPath is an object which takes
        // a property called filter which can be a function
        // we use the arrow operator to define it
        filter: (s: any) => {
          return s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART;
        }
      });

      // if we find one
      if (structure !== null) {
        this.creep.say('💊', true);
        // try to repair it, if it is out of range
        if (this.creep.repair(structure) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      }
      // // if we can't fine one
      // else {
      //     // look for construction sites
      //     roleBuilder.run(creep);
      // }
    } else {
      // find closest container
      const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 100;
        }
      });
      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(container, {reusePath: 1});
        }
      } else {
        // find closest source
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE) as Source;
        // try to harvest energy, if the source is not in range
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(source, {reusePath: 1});
        }
      }
    }
  }
}
