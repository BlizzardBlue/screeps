import {intel} from '../../config/intel';
import {Navigate} from '../../utils/Navigate';

export const claimer = {
  run: (creep: Creep) => {
    const navigate: Navigate = new Navigate(creep);
    const targetFlag: Flag = Game.flags.claimerTarget;

    // 플래그가 있는 방으로 이동
    if (!creep.memory.arrived) {
      return navigate.toFlag(targetFlag);
    }

    // Claim 시작
    const claimResult = creep.claimController(creep.room.controller);
    switch (claimResult) {
      case OK:
        break;
      case ERR_NOT_IN_RANGE:
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
        break;
      default:
        creep.say(`Err: ${claimResult}`, true);
    }
  }
};
