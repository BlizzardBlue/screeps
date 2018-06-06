export class Repair {
  public creep: Creep;
  // public room: Room;

  constructor(creep: Creep) {
    this.creep = creep;
    // this.room = room;
  }

  public room(): void {
    // // if creep is trying to repair something but has no energy left
    // if (creep.memory.repairing && creep.carry.energy == 0) {
    //     creep.say('⛏️', true);
    //     // switch state
    //     creep.memory.repairing = false;
    // }
    // // if creep is harvesting energy but is full
    // else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
    //     // switch state
    //     creep.memory.repairing = true;
    // }

    // find closest structure with less than max hits
    // Exclude walls because they have way too many max hits and would keep
    // our repairers busy forever. We have to find a solution for that later.
    const structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
      // the second argument for findClosestByPath is an object which takes
      // a property called filter which can be a function
      // we use the arrow operator to define it
      filter: (s) => {
        return s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL;
      }
    });

    // if we find one
    if (structure !== undefined) {
      this.creep.say('💊', true);
      // try to repair it, if it is out of range
      if (this.creep.repair(structure) === ERR_NOT_IN_RANGE) {
        // move towards it
        this.creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
}
