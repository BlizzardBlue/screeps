var coreIntel = require('core.intel');
 
var coreSettings = {
    mode: 'normal', // ['normal','harvest','build','upgrade']
    creep: {
        population: {
            harvester: 2,
            miner: 1,
            miner2: 1,
            builder: 0,
            upgrader: 3,
            repairer: 1,
            pioneer: 1,
            cleaner: 1,
            longDistanceMiner: 2,
            remoteRepairer: 1
        },
        priority: {
            harvester: 0,
            miner: 4,
            builder: 1,
            upgrader: 3,
            repairer: 2,
            pioneer: 5,
            cleaner: 6,
            longDistanceMiner: 7,
            remoteRepairer: 8
        },
        parts: {
            harvester: [CARRY,CARRY,CARRY,MOVE,MOVE], // 300
            // harvester: [WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE], // 600
            miner: [WORK,WORK,WORK,WORK,WORK,WORK,WORK, MOVE,MOVE,MOVE], // 800
            builder: [WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], // 1000
            upgrader: [WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE], // 1050
            repairer: [WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE], // 800,
            pioneer: [MOVE,WORK,CARRY, MOVE,WORK,CARRY, MOVE,WORK,CARRY, MOVE,WORK,CARRY, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE, ATTACK], // 1280
            cleaner: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE], // 550
            longDistanceMiner: [MOVE,WORK,CARRY, MOVE,WORK,CARRY, MOVE,WORK,CARRY, MOVE,WORK,CARRY, CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE, ATTACK], // 1280
            claimer: [CLAIM,CLAIM, MOVE,MOVE], // 1300
            remoteRepairer: [MOVE,WORK,CARRY, MOVE,WORK,CARRY, MOVE,WORK,CARRY, MOVE,WORK,CARRY, MOVE,MOVE, ATTACK,ATTACK] // 1060
        }
    }
};

module.exports = coreSettings;
