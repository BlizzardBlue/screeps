const _ = require('lodash');

export class ThreatMonitorHelper {
  public roomMemory: RoomMemory;

  constructor(roomMemory: RoomMemory) {
    this.roomMemory = roomMemory;
  }

  // 인베이더 침입 만료시간 검증
  public validateInvaderExpireAt(): void {
    const invaderExpireAt = this.roomMemory.invaderExpireAt;
    if (invaderExpireAt) {
      if (invaderExpireAt && invaderExpireAt < Game.time) {
        this.roomMemory.invader = false;
        delete this.roomMemory.invaderExpireAt;
        console.log(`[Task] Invader expired: ${this.roomMemory.name}`);
      }
    }
  }
}
