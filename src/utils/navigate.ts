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
}
