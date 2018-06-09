import {Navigate} from '../../utils/Navigate';
import {GeneralRole} from './GeneralRole';

/**
 * 룸 예약용 크립
 */
export class Reserver extends GeneralRole {
  constructor(creep: Creep) {
    super(creep);
  }

  public run() {
    const navigate: Navigate = new Navigate(this.creep);
    const targetFlag: Flag = Game.flags.reserverTarget;
    if (!this.creep.memory.arrived) {
      navigate.toFlag(targetFlag);
      return;
    }
    if (this.creep.reserveController(this.creep.room.controller) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
    }
  }
}
