import {intel} from '../../config/intel';
import {GeneralRole} from './GeneralRole';

/**
 * 채굴 전문가
 */
export class Miner extends GeneralRole {
  constructor(creep: Creep) {
    super(creep);
  }

  public run() {
    const source = Game.getObjectById(intel.rooms[this.home].sources.primary.id) as Source;
    // 소스 옆에 붙은 컨테이너 가져옴
    const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: (s: any) => {
        return s.structureType === STRUCTURE_CONTAINER;
      }
    })[0];

    // 크립이 컨테이너에 올라가면
    if (this.creep.pos.isEqualTo(container.pos)) {
      // 채굴 시작
      this.creep.harvest(source);
    } else {
      this.creep.moveTo(container, {reusePath: 1});
    }
  }
}
