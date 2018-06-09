import {GeneralRole} from './GeneralRole';

/**
 * 룸 방어용 크립
 */
export class Defender extends GeneralRole {
  constructor(creep: Creep) {
    super(creep);
  }

  public run() {
    // Attack
    const target = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
      if (this.creep.attack(target) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(target, {reusePath: 1});
      }
    } else {
      this.creep.moveTo(30, 25, {reusePath: 1});
    }
  }
}
