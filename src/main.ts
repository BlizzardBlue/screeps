const _ = require('lodash');
// import {ErrorMapper} from 'utils/ErrorMapper';

import {roleMap} from 'config/roleMap';
import {settings} from 'config/settings';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
// export const loop = ErrorMapper.wrapLoop(() => {
export const loop = () => {
  // 죽은 크립 메모리 청소
  for (const name of Object.keys(Memory.creeps)) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
      console.log('Cleared non-existing creep memory:', name);
    }
  }

  // 설정으로 등록해둔 방에서 크립 생산
  for (const roomName of Object.keys(settings.rooms)) {
    const roomSetting = settings.rooms[roomName];
    const spawnName = roomSetting.spawn.name;

    for (const creepType of Object.keys(roomSetting.creep)) {
      const creepSetting = roomSetting.creep[creepType];

      // 타입이 같고 && 고향이 같고 && 살아있는 크립의 수 계산
      const liveCreeps = _.filter(Game.creeps, (creep: any) => {
        return creep.memory.role === creepType && creep.memory.home === roomName;
      });

      // 설정해둔 개체수 목표치 이하면 생산
      if (liveCreeps.length < creepSetting.population) {
        const newName = `${creepType}_${roomName}_${Game.time}`;
        // 메모리에 정보 추가
        const additionalMemory = {
          home: roomName,
          spawn: spawnName
        };
        Game.spawns[spawnName].spawnCreep(creepSetting.parts, newName, {
          memory: _.merge(additionalMemory, creepSetting.initialMemory)
        });
      }
    }
  }

  // 크립 생산시, 스폰 옆에 메시지를 띄움
  for (const spawnName of Object.keys(Game.spawns)) {
    const spawn: StructureSpawn = Game.spawns[spawnName];
    if (spawn.spawning) {
      const spawningCreep = Game.creeps[spawn.spawning.name];
      spawn.room.visual.text(`🛠️ ${spawningCreep.memory.role}`, spawn.pos.x + 1, spawn.pos.y, {
        align: 'left',
        opacity: 0.8
      });
    }
  }

  // 타워 관련
  const tower = Game.getObjectById('5b132f1de77af90020399c2f') as StructureTower;
  if (tower) {
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  }
  const tower2 = Game.getObjectById('5b186b836c39f600211ac970') as StructureTower;
  if (tower2) {
    const closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower2.attack(closestHostile);
    }
  }
  const tower3 = Game.getObjectById('5b14bb351dca9e002421adaa') as StructureTower;
  if (tower3) {
    const closestHostile = tower3.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower3.attack(closestHostile);
    }

    // const closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
    //     filter: (structure) => structure.hits < structure.hitsMax
    // });
    // if (closestDamagedStructure) {
    //     tower2.repair(closestDamagedStructure);
    // }
  }

  // 크립 run()
  for (const name of Object.keys(Game.creeps)) {
    const creep = Game.creeps[name];
    roleMap[creep.memory.role].run(creep);
  }
  console.log(Game.cpu.getUsed());
};
