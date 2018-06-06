import {intel} from '../config/intel';

export const miner2 = {
  run: (creep: any) => { // TODO: any 대신 크립
    const source = Game.getObjectById(intel.rooms.home.sources.secondary.id) as Source;
    // 소스 옆에 붙은 컨테이너 가져옴
    const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: (s: any) => {
        return s.structureType === STRUCTURE_CONTAINER;
      }
    })[0];

    // 크립이 컨테이너에 올라가면
    if (creep.pos.isEqualTo(container.pos)) {
      // 채굴 시작
      creep.harvest(source);
    } else {
      creep.moveTo(container);
    }
  }
};
