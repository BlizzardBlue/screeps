import {GeneralRole} from './GeneralRole';

/**
 * 광물 채굴 전문가
 */
export class MineralMiner extends GeneralRole {
  constructor(creep: Creep) {
    super(creep);
  }

  public run() {
    const mineral = this.creep.room.find(FIND_MINERALS)[0] as Mineral;
    // 미네랄 옆에 붙은 컨테이너 가져옴
    const container = mineral.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: (s: any) => {
        return s.structureType === STRUCTURE_CONTAINER;
      }
    })[0];

    // 크립이 컨테이너에 올라가면
    if (this.creep.pos.isEqualTo(container.pos)) {
      // 미네랄 채굴 시작
      this.creep.harvest(mineral);
    } else {
      this.creep.moveTo(container, {reusePath: 1});
    }
  }
}
