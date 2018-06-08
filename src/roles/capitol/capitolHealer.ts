import {settings} from '../../config/settings';

import {Heal} from '../../actions/Heal';
import {SpawnQueue} from '../../queues/SpawnQueue';
import {Navigate} from '../../utils/Navigate';

export const capitolHealer = {
  run: (creep: Creep) => {
    const heal: Heal = new Heal(creep);
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

    // 인베이더 들어오면 딜러부터 힐
    if (creep.room.memory.invader) {
      // 자신의 체력이 500 이하로 떨어지면 일단 셀프 힐
      if (creep.hits <= 500) {
        heal.self();
      } else {
        heal.dealer();
      }
    } else if (heal.checkMyDamagedCreeps()) {
      // 인베이더 없으면 아군 크립 힐
      heal.myCreeps();
    } else {
      // 평상시엔 대기
      creep.moveTo(26, 19);
    }
  }
};
