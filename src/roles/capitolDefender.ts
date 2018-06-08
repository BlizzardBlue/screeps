import {settings} from '../config/settings';

import {Attack} from '../actions/Attack';
import {SpawnQueue} from '../queues/SpawnQueue';
import {Navigate} from '../utils/Navigate';

export const capitolDefender = {
  run: (creep: Creep) => {
    const attack: Attack = new Attack(creep);
    const navigate: Navigate = new Navigate(creep);
    const spawnQueue: SpawnQueue = new SpawnQueue(creep.memory.spawn);

    // 캐피톨로 이동
    if (!creep.memory.arrived) {
      return navigate.toCapitol();
    }

    // 수명이 200틱 남았을 때 스폰 큐에 추가
    if (creep.ticksToLive === 200) {
      const newCreep: SpawnQueueItem = {
        initialMemory: settings.rooms[creep.memory.home].creep[creep.memory.role].initialMemory,
        parts: settings.rooms[creep.memory.home].creep[creep.memory.role].parts
      };
      spawnQueue.priorProduce(newCreep);
    }

    // 인베이더 들어오면 접근해서 전투
    if (creep.room.memory.invader) {
      attack.invader();
    } else {
      // 평상시엔 대기
      creep.moveTo(26, 19);
    }
  }
};
