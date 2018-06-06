import {intel} from '../config/intel';

export const builder = {
  run: (creep: Creep) => {
    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('⛏️', true);
    }

    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧', true);
    }

    if (creep.memory.building) {
      const targets: ConstructionSite[] = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }

    if (!creep.memory.building) {
      // find closest container
      const container: any = creep.pos.findClosestByPath(FIND_STRUCTURES, { // TODO: any 개선
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 100;
        }
      });

      // if one was found
      if (container !== undefined) {
        // try to withdraw energy, if the container is not in range
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(container);
        }
      } else {
        // find closest source
        const source = Game.getObjectById(intel.rooms.home.sources.secondary.id) as Source; // let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(source);
        }
      }
    }
  }
};
