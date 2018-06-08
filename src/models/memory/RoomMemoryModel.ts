const _ = require('lodash');

export class RoomMemoryModel {
  public roomName: string;
  public creep: Creep;

  constructor(roomName: string, creep: Creep) {
    this.roomName = roomName;
    this.creep = creep;
  }

  // 룸 메모리 초기화
  public initializeMemory(): void {
    // 처음 오는 방일경우 빈 Object로 메모리 할당
    if (_.isUndefined(Memory.rooms[this.roomName].sources)) {
      Memory.rooms[this.roomName].sources = {};
    }
    // 해당 룸의 소스정보 입력
    if (_.isEmpty(Memory.rooms[this.roomName].sources)) {
      const sources: Source[] = Game.rooms[this.roomName].find(FIND_SOURCES);
      for (const source of sources) {
        const id: string = source.id;
        Memory.rooms[this.roomName].sources[id] = {
          id: id,
          reserved: false,
          reserver: null
        };
      }
    }
  }

  // 소스 예약현황 조회
  public getSourceReservationStatus(id: string): boolean {
    return Memory.rooms[this.roomName].sources[id].reserved;
  }

  // 예약되지 않은 소스 조회
  public getUnreservedSources(): string[] {
    const unreservedSourceIds: string[] = [];
    for (const id of Object.keys(Memory.rooms[this.roomName].sources)) {
      const isReserved: boolean = this.getSourceReservationStatus(id);
      if (!isReserved) {
        unreservedSourceIds.push(id);
      }
    }
    return unreservedSourceIds;
  }

  // 소스 예약
  public reserveSource(id: string): string {
    const isReserved: boolean = this.getSourceReservationStatus(id);
    if (isReserved) {
      // 예약 실패
      throw new Error('Already reserved source');
    } else {
      // 예약 성공
      Memory.rooms[this.roomName].sources[id].reserved = true;
      Memory.rooms[this.roomName].sources[id].reserver = this.creep.id;
      return id;
    }
  }

  // 소스 예약 해제
  public releaseSource(id: string): boolean {
    const isReserved: boolean = this.getSourceReservationStatus(id);
    if (!isReserved) {
      // 예약 해제 실패
      return false;
    } else {
      // 예약 해제 성공
      Memory.rooms[this.roomName].sources[id].reserver = null;
      Memory.rooms[this.roomName].sources[id].reserved = false;
      return true;
    }
  }
}
