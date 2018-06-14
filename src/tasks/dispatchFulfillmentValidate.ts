const _ = require('lodash');

export function dispatchFulfillmentValidate() {
  if (_.isUndefined(Memory.rooms)) {
    console.log('[Task | dispatchFulfillmentValidate] Memory not initialized');
    return false;
  }
  for (const roomName of Object.keys(Memory.rooms)) {
    for (const role of Object.keys(Memory.rooms[roomName].dispatchFulfillment)) {
      for (const creepName of Memory.rooms[roomName].dispatchFulfillment[role].creeps) {
        // console.log(creepName);
        const creepObject = Game.creeps[creepName];
        if (_.isUndefined(creepObject)) {
          _.pull(Memory.rooms[roomName].dispatchFulfillment[role].creeps, creepName);
          Memory.rooms[roomName].dispatchFulfillment[role].count = Memory.rooms[roomName].dispatchFulfillment[role].creeps.length;
          console.log(`[Task] Ungracefully pulled creep from dispatch fulfillment memory: ${creepName}`);
          console.log('(Temp) Result:', Memory.rooms[roomName].dispatchFulfillment[role].creeps);
        }
      }
    }
  }
}

/**
 * 스폰 큐를 읽어 각 룸의 dispatchFulfillment.spawnQueued 값을 갱신함
 */
export function calculateDispatchFulfillmentSpawnQueued(): void {
  // 모든 룸의 dispatchFulfillment[role].spawnQueued 메모리 초기화
  for (const roomName of Object.keys(Memory.rooms)) {
    for (const role of Object.keys(Memory.rooms[roomName].dispatchFulfillment)) {
      Memory.rooms[roomName].dispatchFulfillment[role].spawnQueued = 0;
    }
  }
  for (const spawnName of Object.keys(Memory.spawns)) {
    for (const item of Memory.spawns[spawnName].queue) {
      const dispatchSite: string = item.initialMemory.dispatchSite;
      const role: string = item.initialMemory.role;
      Memory.rooms[dispatchSite].dispatchFulfillment[role].spawnQueued += 1; // spawnQueued 값 1 증가
    }
  }
}
