const _ = require('lodash');

import {GeneralRole} from './GeneralRole';

/**
 * 룸 상주형 건축공
 */
export class Builder extends GeneralRole {
  public dismantleFlag: Flag;

  constructor(creep: Creep) {
    super(creep, {
      targetTicksToLiveOnDispatch: 200
    });
    this.dismantleFlag = Game.flags.dismantle_1;
  }

  public run() {
    // 파견지에 인베이더가 침입하면, 집으로 대피함
    if (this.dispatch) {
      const dispatchSiteUnderAttack: boolean = Memory.rooms[this.creep.memory.dispatchSite].invader;
      if (dispatchSiteUnderAttack) {
        this.creep.say('🆘', true);
        return this.navigate.toHome();
      }
    }

    // 파견지에 도착하면 메모리의 dispatchSiteArrived값 true로 변경
    if (this.dispatch
      && !this.dispatchSiteArrived
      && this.creep.room.name === this.creep.memory.dispatchSite
      && _.inRange(this.creep.pos.x, 2, 47)
      && _.inRange(this.creep.pos.y, 2, 47)) {
      this.creep.say('도착!', true);
      this.creep.memory.dispatchSiteArrived = true;
    }

    // 도착한 다음에 다른 방으로 이동해버릴경우, 다시 돌아오도록 하기 위함
    // TODO: 개선 필요
    if (this.dispatch && this.creep.room.name !== this.dispatchSite) {
      this.creep.memory.dispatchSiteArrived = false;
    }

    // 파견용 크립일경우 파견지로 이동
    if (this.dispatch && !this.dispatchSiteArrived) {
      this.creep.say(`${this.dispatchSite}로 파견가요`, true);
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

    if (this.creep.memory.building && this.creep.carry.energy === 0) {
      this.creep.memory.building = false;
      this.creep.say('⛏️', true);
    }

    if (!this.creep.memory.building && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.building = true;
      this.creep.say('🚧', true);
    }

    if (this.creep.memory.building) {
      if (this.dismantleFlag) {
        const dismantleTargets = this.creep.room.lookAt(this.dismantleFlag.pos);
        const filteredTargets = dismantleTargets.filter((target) => {
          if (target.type === 'structure') {
            return target.structure;
          }
        });
        if (filteredTargets) {
          for (const target of filteredTargets) {
            if (this.creep.dismantle(target.structure) === ERR_NOT_IN_RANGE) {
              this.creep.moveTo(target.structure);
            }
          }
        }
      } else {
        const target: ConstructionSite = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (target) {
          if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 4});
          }
        }
      }
    }

    if (!this.creep.memory.building) {
      // find closest container
      const container: any = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { // TODO: any 개선
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 200;
        }
      });

      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(container, {reusePath: 4});
        }
      } else {
        // find closest source

        // const source = Game.getObjectById(this.creep.room.rooms[this.home].sources.secondary.id) as Source; // let source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        const source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
          filter: s => s.room.name === this.creep.room.name
        });
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          return this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 4});
        }
      }
    }
  }
}
