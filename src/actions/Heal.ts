export class Heal {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  // 딜러 힐
  public dealer(): any {
    const dealer = this.creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: creep => creep.hits < creep.hitsMax
    });

    if (dealer) {
      if (this.creep.rangedHeal(dealer) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(dealer, {visualizePathStyle: {stroke: '#4bff5f'}, reusePath: 0});
      }
    }
  }

  // 아군 크립 힐
  public myCreeps(): any {
    const myCreep = this.creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: creep => creep.hits < creep.hitsMax
    });

    if (myCreep) {
      if (this.creep.rangedHeal(myCreep) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(myCreep, {visualizePathStyle: {stroke: '#4bff5f'}, reusePath: 0});
      }
    }
  }

  // 셀프 힐
  public self(): any {
    if (this.creep.hits < this.creep.hitsMax) {
      this.creep.heal(this.creep);
    }
  }

  // 다친 아군 크립이 있는지 확인
  public checkMyDamagedCreeps(): boolean {
    const myDamagedCreeps = this.creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: creep => creep.hits < creep.hitsMax
    });
    return !!myDamagedCreeps;
  }
}
