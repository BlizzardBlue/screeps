// import {SpawnQueue} from '../queues/SpawnQueue';
// import {settings} from '../config/settings';
//
// const _ = require('lodash');
//
// export class DefenderCaller {
//   public room: Room;
//   private spawnQueue: SpawnQueue;
//
//   constructor(room: Room) {
//     this.room = room;
//     this.spawnQueue = new SpawnQueue('Spawn2'); // TODO: 가장 가까운 스폰에서 생산하도록 개선
//   }
//
//   public run(): any {
//     const dealer: SpawnQueueItem = {
//       initialMemory: {
//         initialMemory: {
//           role: 'capitolDefender',
//           class: 'dealer',
//           arrived: false
//         },
//       },
//       parts: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK]
//     };
//
//     // const healer: SpawnQueueItem = {
//     //   initialMemory: {
//     //
//     //   },
//     //   parts: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL]
//     // };
//
//     for (const roomName of Object.keys(Memory.rooms)) {
//       const underAlert = Memory.rooms[roomName].invader;
//       const requestedDefender = Memory.rooms[roomName].requestedDefender;
//       // 인베이더 경보가 켜져있고 && 방어병력 요청이 이루어져있지 않으면
//       if (underAlert && !requestedDefender) {
//         _.times(3, () => {
//           this.spawnQueue.priorProduce(dealer);
//         });
//         Memory.rooms[roomName].requestedDefender = true;
//       }
//     }
//   }
// }
//
//
// const spawnQueue: SpawnQueue = new SpawnQueue(dispatchSetting[role].fromSpawn);
// // 스폰 큐에 추가해야할 크립 수 계산
// const requiredNumber: number = ((dispatchSetting[role].population - dispatchFulfillment[role].count) - dispatchFulfillment[role].spawnQueued);
// const newCreep: SpawnQueueItem = {
//   initialMemory: dispatchSetting[role].initialMemory,
//   parts: dispatchSetting[role].parts
// };
// // 필요한 수 만큼 스폰 큐에 추가
// _.times(requiredNumber, () => {
//   spawnQueue.produce(newCreep);
//   // 스폰 큐 대기 카운트 1 증가
//   Memory.rooms[roomName].dispatchFulfillment[role].spawnQueued += 1;
// });
