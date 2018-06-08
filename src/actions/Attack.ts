export class Attack {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  // 인베이더 공격
  public invader(): any {
    const invader = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
      filter: hostile => hostile.owner.username === 'Invader'
    });

    if (invader) {
      const attackResult = this.creep.attack(invader);
      const rangedAttackResult = this.creep.rangedAttack(invader);
      if (attackResult === ERR_NOT_IN_RANGE || rangedAttackResult === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(invader, {visualizePathStyle: {stroke: '#ff3b4d'}, reusePath: 0});
      }
    }
  }

  // 적 공격
  public hostile(): any {
    const hostile = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (hostile) {
      const attackResult = this.creep.attack(hostile);
      const rangedAttackResult = this.creep.rangedAttack(hostile);
      if (attackResult === ERR_NOT_IN_RANGE || rangedAttackResult === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(hostile, {visualizePathStyle: {stroke: '#ff3b4d'}, reusePath: 0});
      }
    }
  }
}
