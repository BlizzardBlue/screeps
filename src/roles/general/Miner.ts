const _ = require('lodash');

import {intel} from '../../config/intel';
import {GeneralRole} from './GeneralRole';

/**
 * 채굴 전문가
 */
export class Miner extends GeneralRole {
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

    let source = Game.getObjectById(intel.rooms[this.home].sources.primary.id) as Source;
    if (this.dispatch) { // TODO: 개선
      source = Game.getObjectById(intel.rooms[this.dispatchSite].sources.primary.id) as Source;
    }
    // 소스 옆에 붙은 컨테이너 가져옴
    const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: (s: any) => {
        return s.structureType === STRUCTURE_CONTAINER;
      }
    })[0];

    // 크립이 컨테이너에 올라가면
    if (!_.isNull(container)) {
      if (this.creep.pos.isEqualTo(container.pos)) {
        // 채굴 시작
        this.creep.harvest(source);
      } else {
        this.creep.moveTo(container, {reusePath: 1});
      }
    }
  }
}
