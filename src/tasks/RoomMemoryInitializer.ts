const _ = require('lodash');

import {intel} from '../config/intel';

export class RoomMemoryInitializer {
  public room: Room;

  constructor(room: Room) {
    this.room = room;
  }

  public initialize(): void {
    // intel에 기재된 방들의 메모리 초기화
    for (const roomName of Object.keys(intel.rooms)) {
      const roomMemory = Memory.rooms[roomName];
      if (_.isEmpty(roomMemory)) {
        Memory.rooms[roomName] = {
          name: roomName
        };
      }
    }

    // 크립이 돌아다니면서 새로 방문한 방의 메모리 초기화
    if (_.isEmpty(this.room.memory)) {
      this.room.memory = {
        name: this.room.name
      };
    }
  }
}
