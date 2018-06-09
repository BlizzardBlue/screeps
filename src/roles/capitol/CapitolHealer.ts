import {settings} from '../../config/settings';

import {Heal} from '../../actions/Heal';
import {intel} from '../../config/intel';
import {SpawnQueue} from '../../queues/SpawnQueue';
import {Navigate} from '../../utils/Navigate';
import {CapitolRole} from './CapitolRole';

export class CapitolHealer extends CapitolRole {
  public capitolRoomName: string;

  constructor(creep: Creep) {
    super(creep);
    this.capitolRoomName = intel.alias.capitol.roomName;
  }

  public run() {
    const heal: Heal = new Heal(this.creep);
    const navigate: Navigate = new Navigate(this.creep);
    const spawnQueue: SpawnQueue = new SpawnQueue(this.creep.memory.spawn);

    // 캐피톨로 이동
    if (!this.creep.memory.arrived) {
      return navigate.toCapitol();
    }

    // 수명이 200틱 남았을 때 스폰 큐에 추가
    if (this.creep.ticksToLive === 200) {
      const newCreep: SpawnQueueItem = {
        initialMemory: settings.rooms[this.creep.memory.home].creep[this.creep.memory.role].initialMemory,
        parts: settings.rooms[this.creep.memory.home].creep[this.creep.memory.role].parts
      };
      spawnQueue.priorProduce(newCreep);
    }

    // 인베이더 들어오면 딜러부터 힐
    if (this.creep.room.memory.invader) {
      // 자신의 체력이 500 이하로 떨어지면 일단 셀프 힐
      if (this.creep.hits <= 500) {
        heal.self();
      } else {
        heal.dealer();
      }
    } else if (heal.checkMyDamagedCreeps()) {
      // 인베이더 없으면 아군 크립 힐
      heal.myCreeps();
    } else {
      // 평상시엔 대기
      this.creep.moveTo(26, 19);
    }
  }
}
