export class Repair {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public room(): any {
    const structure = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => {
        return s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL;
      }
    });

    if (structure !== null) {
      this.creep.say('💊', true);
      if (this.creep.repair(structure) === ERR_NOT_IN_RANGE) {
        return this.creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }

  public weakRampart(targetHits?: number): any {
    const rampart = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => {
        return (s.hits < (targetHits || 3000)) && s.structureType === STRUCTURE_RAMPART;
      }
    });
    const repairResult = this.creep.repair(rampart);
    this.creep.say(`${repairResult}`);
    switch (repairResult) {
      case OK:
        break;
      case ERR_INVALID_TARGET:
        break;
      case ERR_NOT_IN_RANGE:
        this.creep.moveTo(rampart, {reusePath: 1});
        break;
      default:
        this.creep.say(`Err: ${repairResult}`);
        console.log(new Error(JSON.stringify({
          creep: this.creep.name,
          errorCode: repairResult
        })));
    }
  }

  public weakWall(targetHits?: number): any {
    const wall = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => {
        return (s.hits < (targetHits || 20000)) && s.structureType === STRUCTURE_RAMPART;
      }
    });
    const repairResult = this.creep.repair(wall);
    switch (repairResult) {
      case OK:
        return true;
      case ERR_INVALID_TARGET:
        return false;
      case ERR_NOT_IN_RANGE:
        this.creep.moveTo(wall, {reusePath: 1});
        return true;
      default:
        this.creep.say(`Err: ${repairResult}`);
        console.log(new Error(JSON.stringify({
          creep: this.creep.name,
          errorCode: repairResult
        })));
    }
  }
}
