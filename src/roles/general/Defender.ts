const _ = require('lodash');

import {Attack} from '../../actions/Attack';
import {GeneralRole} from './GeneralRole';

/**
 * 룸 방어용 크립
 */
export class Defender extends GeneralRole {
  private attack: Attack;

  constructor(creep: Creep) {
    super(creep, {
      targetTicksToLiveOnDispatch: 200
    });
    this.attack = new Attack(creep);
  }

  public run() {
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

    // 인베이더 들어오면 접근해서 전투
    if (this.creep.room.memory.invader) {
      this.attack.invader();
    } else {
      // 평상시엔 대기
      this.creep.moveTo(27, 27);
    }
  }
}
