import {intel} from '../config/intel';

export const remoteMiner = {
  run: (creep: Creep) => {
    // const targetRoomId = intel.expansion.mining.rooms[0];
    // const targetRoomIntel = intel.rooms[targetRoomId];
    // const targetRoom = targetRoomIntel.object;

    // get source
    const source = Game.getObjectById(intel.rooms.home.sources.secondary.id) as Source;
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
      creep.moveTo(container);
    }
  }
};
