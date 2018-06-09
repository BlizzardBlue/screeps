import {settings} from '../../config/settings';

import {Attack} from '../../actions/Attack';
import {intel} from '../../config/intel';
import {SpawnQueue} from '../../queues/SpawnQueue';
import {Navigate} from '../../utils/Navigate';
import {CapitolRole} from './CapitolRole';

export class CapitolDefender extends CapitolRole {
  public capitolRoomName: string;

  constructor(creep: Creep) {
    super(creep);
    this.capitolRoomName = intel.alias.capitol.roomName;
  }

  public run() {
    const attack: Attack = new Attack(this.creep);
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

    // 인베이더 들어오면 접근해서 전투
    if (this.creep.room.memory.invader) {
      attack.invader();
    } else {
      // 평상시엔 대기
      this.creep.moveTo(26, 19);
    }
  }
}
