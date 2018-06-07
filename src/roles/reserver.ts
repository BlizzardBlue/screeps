import {intel} from '../config/intel';
import {Navigate} from '../utils/navigate';

export const reserver = {
  run: (creep: Creep) => {
    const navigate: Navigate = new Navigate(creep);
    const targetFlag: Flag = Game.flags.reserverTarget;
    if (!creep.memory.arrived) {
      navigate.toFlag(targetFlag);
      return;
    }
    if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 0});
    }
  }
};
