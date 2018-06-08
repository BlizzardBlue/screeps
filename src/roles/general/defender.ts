export const defender = {
  run: (creep: Creep) => {

    // Attack
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
      if (creep.attack(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {reusePath: 1});
      }
    } else {
      creep.moveTo(30, 25, {reusePath: 1});
    }
  }
};
