const _ = require('lodash');

export class ThreatMonitor {
  public room: Room;

  constructor(room: Room) {
    this.room = room;
  }

  // 인베이더 경계
  public invader(): any {
    const invader = this.room.find(FIND_HOSTILE_CREEPS, {
      filter: creep => creep.owner.username === 'Invader'
    });
    const alert: boolean = !_.isEmpty(invader);
    const invaderExpireAt = this.room.memory.invaderExpireAt;
    if (alert) {
      this.room.memory.invader = true;
    }
    if (alert && !invaderExpireAt) {
      this.room.memory.invaderExpireAt = Game.time + 1500;
    }
  }

  // 적군 경계
  public hostile(): any {
    const hostile = this.room.find(FIND_HOSTILE_CREEPS, {
      filter: creep => creep.owner.username !== 'Invader'
    });
    this.room.memory.hostile = !_.isEmpty(hostile);
  }
}
