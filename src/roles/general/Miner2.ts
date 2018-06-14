const _ = require('lodash');

import {intel} from '../../config/intel';
import {GeneralRole} from './GeneralRole';

/**
 * 채굴 전문가
 * TODO: Miner 클래스 하나로 합치기
 */
export class Miner2 extends GeneralRole {
  constructor(creep: Creep) {
    super(creep, {
      targetTicksToLiveOnDispatch: 200
    });
  }

  public run() {
    try {
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

      // 파견근무용 크립일경우 파견지로 이동
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

      let source;
      if (this.dispatch) { // TODO: 개선
        source = Game.getObjectById(intel.rooms[this.dispatchSite].sources.secondary.id) as Source;
      } else {
        source = Game.getObjectById(intel.rooms[this.home].sources.secondary.id) as Source;
      }
      // 소스 옆에 붙은 컨테이너 가져옴
      const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER;
        }
      })[0];

      // 크립이 컨테이너에 올라가면
      if (!_.isNull(container) && !_.isUndefined(container)) {
        if (this.creep.pos.isEqualTo(container.pos)) {
          // 채굴 시작
          this.creep.harvest(source);
        } else {
          this.creep.moveTo(container, {reusePath: 4});
        }
      } else {
        this.creep.say('컨테이너가 없어요!', true);
        console.log(`[Warn | Creep] 컨테이너가 없어요! (${this.creep.room.name})`);
      }
    } catch (err) {
      console.log(`[Error] ${this.creep.name}\n${err}`);
    }
  }
}
