import {Repair} from '../../actions/repair';
import {intel} from '../../config/intel';

export const builder = {
  run: (creep: Creep) => {
    const home = creep.memory.home;
    const repair: Repair = new Repair(creep);
    const dismantleFlag: Flag = Game.flags.dismantle_1;

    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('⛏️', true);
    }

    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧', true);
    }

    if (creep.memory.building) {
      if (dismantleFlag) {
        const dismantleTargets = creep.room.lookAt(dismantleFlag.pos);
        const filteredTargets = dismantleTargets.filter((target) => {
          if (target.type === 'structure') {
            return target.structure;
          }
        });
        if (filteredTargets) {
          for (const target of filteredTargets) {
            if (creep.dismantle(target.structure) === ERR_NOT_IN_RANGE) {
              creep.moveTo(target.structure);
            }
          }
        }
      } else {
        const target: ConstructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (target) {
          if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 1});
          }
        }
      }
    }

    if (!creep.memory.building) {
      // find closest container
      const container: any = creep.pos.findClosestByPath(FIND_STRUCTURES, { // TODO: any 개선
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 200;
        }
      });

      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(container, {reusePath: 1});
        }
      } else {
        // find closest source
        const source = Game.getObjectById(intel.rooms[home].sources.secondary.id) as Source; // let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(source, {reusePath: 1});
        }
      }
    }
  }
};
