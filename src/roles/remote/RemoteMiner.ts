import {Navigate} from '../../actions/Navigate';
import {intel} from '../../config/intel';

export const remoteMiner = {
  run: (creep: Creep) => {
    const navigate: Navigate = new Navigate(creep);
    const targetRoomName: string = intel.expansion.mining.rooms[0];

    if (creep.room.name === targetRoomName) {
      // get source
      const source = Game.getObjectById(intel.rooms[targetRoomName].sources.primary.id) as Source;
      // find container next to source
      const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: (s: any) => { // TODO: any 개선
          return s.structureType === STRUCTURE_CONTAINER;
        }
      })[0];

      // if creep is on top of the container
      if (creep.pos.isEqualTo(container.pos)) {
        // harvest source
        creep.harvest(source);
      } else {
        // move towards it
        creep.moveTo(container, {reusePath: 4});
      }
    } else {
      // creep.moveTo(targetRoomName);
    }
  }
};
