import {Navigate} from '../../utils/Navigate';
import {GeneralRole} from './GeneralRole';

/**
 * 방 점령용 크립
 */
export class Claimer extends GeneralRole {
  constructor(creep: Creep) {
    super(creep);
  }

  public run() {
    const navigate: Navigate = new Navigate(this.creep);
    const targetFlag: Flag = Game.flags.claimerTarget;

    // 플래그가 있는 방으로 이동
    if (!this.creep.memory.arrived) {
      return navigate.toFlag(targetFlag);
    }

    // Claim 시작
    const claimResult = this.creep.claimController(this.creep.room.controller);
    switch (claimResult) {
      case OK:
        break;
      case ERR_NOT_IN_RANGE:
        this.creep.moveTo(this.creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
        break;
      default:
        this.creep.say(`Err: ${claimResult}`, true);
    }
  }
}
