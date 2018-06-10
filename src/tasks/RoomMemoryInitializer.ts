const _ = require('lodash');

import {intel} from '../config/intel';
import {roleMap} from '../roles/roleMap';

export class RoomMemoryInitializer {
  public room: Room;
  private readonly dispatchFulfillmentInitialData: RoomMemoryDispatchFulfillment;

  constructor(room: Room) {
    this.room = room;
    this.dispatchFulfillmentInitialData = {};
    for (const role of Object.keys(roleMap)) {
      this.dispatchFulfillmentInitialData[role] = {
        creeps: [],
        count: 0,
        spawnQueued: 0
      };
    }
  }

  public initialize(): void {
    // 크립이 돌아다니면서 새로 방문한 방의 메모리 초기화
    if (_.isEmpty(this.room.memory)) {
      Game.rooms[this.room.name].memory = {
        name: this.room.name,
        dispatchFulfillment: this.dispatchFulfillmentInitialData
      };
      console.log(`[Task | ${this.room.name}] Room memory initialized`);
    }

    // intel에 기재된 방들의 메모리 초기화
    for (const roomName of Object.keys(intel.rooms)) {
      const roomMemory = Memory.rooms[roomName];
      if (_.isEmpty(roomMemory)) {
        Memory.rooms[roomName] = {
          name: roomName,
          dispatchFulfillment: this.dispatchFulfillmentInitialData
        };
        console.log(`[Task | ${roomName}] Room memory initialized`);
      }
    }
  }
}
