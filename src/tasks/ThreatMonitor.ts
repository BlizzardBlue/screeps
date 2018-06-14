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
      if (!this.room.memory.invader) {
        console.log(`[Alert | Watchtower] Invader alert: ${this.room.name}`);
        this.room.memory.invaderExpireAt = Game.time + 1500;
      }
      this.room.memory.invader = true;
    } else {
      this.room.memory.invader = false;
    }
  }

  // 적군 경계
  public hostile(): any {
    const hostile = this.room.find(FIND_HOSTILE_CREEPS, {
      filter: creep => creep.owner.username !== 'Invader'
    });
    const alert: boolean = !_.isEmpty(hostile);
    if (alert) {
      if (!this.room.memory.hostile) {
        console.log(`[Alert | Watchtower] Hostile alert: ${this.room.name}`);
      }
      this.room.memory.hostile = true;
    } else {
      this.room.memory.hostile = false;
    }
  }
}
