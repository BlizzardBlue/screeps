export class Navigate {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public toFlag(flag: Flag): CreepMoveReturnCode | ERR_NO_PATH | ERR_INVALID_TARGET | ERR_NOT_FOUND | void {
    if (!this.creep.pos.isEqualTo(flag.pos)) {
      return this.creep.moveTo(flag);
    } else if (this.creep.pos.isEqualTo(flag.pos)) {
      this.creep.memory.arrived = true;
    }
  }

  public toRoom(roomName: string): any {
    const route = Game.map.findRoute(this.creep.room.name, roomName) as any; // TODO: 타이핑 개선
    if (route.length > 0) {
      this.creep.say(`GOTO ${route[0].room.name}`);
      const exit = this.creep.pos.findClosestByRange(route[0].exit);
      return this.creep.moveTo(exit);
    }
  }
}
