import {intel} from '../../config/intel';
import {GeneralRole} from './GeneralRole';

/**
 * 룸 수리공
 */
export class Repairer extends GeneralRole {
  constructor(creep: Creep) {
    super(creep);
  }

  public run() {
    // if creep is trying to repair something but has no energy left
    if (this.creep.memory.repairing && this.creep.carry.energy === 0) {
      this.creep.say('⛏️', true);
      // switch state
      this.creep.memory.repairing = false;
    } else if (!this.creep.memory.repairing && this.creep.carry.energy === this.creep.carryCapacity) {
      // switch state
      this.creep.say('💊', true);
      this.creep.memory.repairing = true;
    }

    // if creep is supposed to repair something
    if (this.creep.memory.repairing) {
      // find closest structure with less than max hits
      // Exclude walls because they have way too many max hits and would keep
      // our repairers busy forever. We have to find a solution for that later.
      const structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        // the second argument for findClosestByPath is an object which takes
        // a property called filter which can be a function
        // we use the arrow operator to define it
        filter: (s: any) => {
          return s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART;
        }
      });

      // if we find one
      if (structure !== null) {
        this.creep.say('💊', true);
        // try to repair it, if it is out of range
        if (this.creep.repair(structure) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 1});
        }
      }
      // // if we can't fine one
      // else {
      //     // look for construction sites
      //     roleBuilder.run(creep);
      // }
    } else {
      // find closest container
      const container = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s: any) => {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 100;
        }
      });
      // if one was found
      if (container !== null) {
        // try to withdraw energy, if the container is not in range
        if (this.creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(container, {reusePath: 1});
        }
      } else {
        // find closest source
        const source = Game.getObjectById(intel.rooms[this.home].sources.secondary.id) as Source; // var source = this.creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        // try to harvest energy, if the source is not in range
        if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
          // move towards it
          this.creep.moveTo(source, {reusePath: 1});
        }
      }
    }
  }
}
