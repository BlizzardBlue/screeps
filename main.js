var coreIntel = require('core.intel');
var coreSettings = require('core.settings');
var utilReservation = require('util.reservation');

var roleHarvester = require('role.harvester');
var roleMiner = require('role.miner');
var roleMiner2 = require('role.miner2');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var rolePioneer = require('role.pioneer');
var roleCleaner = require('role.cleaner');
var roleLongDistanceMiner = require('role.longDistanceMiner');
var roleRemoteRepairer = require('role.remoteRepairer');

module.exports.loop = function () {
    // 죽은 크립 메모리 청소
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    
    
    
    // Repairer
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    if(repairers.length < coreSettings.creep.population.repairer) {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.repairer, newName,
            {memory: {role: 'repairer', repairing: false}});
    }

    // Builder
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < coreSettings.creep.population.builder) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.builder, newName,
            {memory: {role: 'builder', building: false}});
    }
    
    // Upgrader
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < coreSettings.creep.population.upgrader) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.upgrader, newName,
            {memory: {role: 'upgrader'}});
    }

    // Miner
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    if(miners.length < coreSettings.creep.population.miner) {
        var newName = 'Miner' + Game.time;
        console.log('Spawning new miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.miner, newName,
            {memory: {role: 'miner'}});
    }

    // Miner2
    var miner2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner2');
    if(miner2s.length < coreSettings.creep.population.miner2) {
        var newName = 'Miner2_' + Game.time;
        console.log('Spawning new miner2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.miner, newName,
            {memory: {role: 'miner2'}});
    }

    // Harvester
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < coreSettings.creep.population.harvester) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.harvester, newName,
            {memory: {role: 'harvester'}});
    }

    // Pioneer
    var pioneers = _.filter(Game.creeps, (creep) => creep.memory.role == 'pioneer');
    if(pioneers.length < coreSettings.creep.population.pioneer) {
        var newName = 'Pioneer' + Game.time;
        console.log('Spawning new pioneer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.pioneer, newName,
            {memory: {role: 'pioneer'}});
    }

    // Cleaner
    var cleaners = _.filter(Game.creeps, (creep) => creep.memory.role == 'cleaner');
    if(cleaners.length < coreSettings.creep.population.cleaner) {
        var newName = 'Cleaner' + Game.time;
        console.log('Spawning new cleaner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.cleaner, newName,
            {memory: {role: 'cleaner', cleaning: true}});
    }

    // LongDistanceMiner
    var longDistanceMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'longDistanceMiner');
    if(longDistanceMiners.length < coreSettings.creep.population.longDistanceMiner) {
        var newName = 'LongDistanceMiner' + Game.time;
        console.log('Spawning new longDistanceMiner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.longDistanceMiner, newName,
            {memory: {role: 'longDistanceMiner', mining: true}});
    }

    // RemoteRepairer
    var remoteRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteRepairer');
    if(remoteRepairers.length < coreSettings.creep.population.remoteRepairer) {
        var newName = 'RemoteRepairer' + Game.time;
        console.log('Spawning new remoteRepairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(coreSettings.creep.parts.remoteRepairer, newName,
            {memory: {role: 'remoteRepairer', ready: false, arrived: false}});
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    // Section 5
    var tower = Game.getObjectById('5b132f1de77af90020399c2f');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }
    }
    var tower2 = Game.getObjectById('5b14bb351dca9e002421adaa');
    if(tower2) {
        var closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower2.attack(closestHostile);
        }
        
        // var closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower2.repair(closestDamagedStructure);
        // }
    }

    // Common
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'miner2') {
            roleMiner2.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'pioneer') {
            rolePioneer.run(creep);
        }
        if(creep.memory.role == 'cleaner') {
            roleCleaner.run(creep);
        }
        if(creep.memory.role == 'longDistanceMiner') {
            roleLongDistanceMiner.run(creep);
        }
        if(creep.memory.role == 'remoteRepairer') {
            roleRemoteRepairer.run(creep);
        }
    }
}