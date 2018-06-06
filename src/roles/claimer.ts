import {intel} from '../config/intel';
import {Navigate} from '../utils/navigate';

export const claimer = {
  run: (creep: Creep) => {
    const navigate: Navigate = new Navigate(creep);
    const targetFlag: Flag = Game.flags.claimerTarget;
    if (!creep.memory.arrived) {
      navigate.toFlag(targetFlag);
    }

    if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
    }
  }
};
