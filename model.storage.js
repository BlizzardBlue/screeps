module.exports = {
    transferText: '🕋📦',
    withdrawText: '🕋🔻',
    
    transfer: function(creep) {
        let storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE && _.sum(s.store) < s.storeCapacity
        });
        if (storage) {
            for(let resourceType in creep.carry) {
                if (creep.transfer(storage, resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    },

    withdraw: function(creep, resourceType) { // TODO: amount parameter 지원
        let storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE && _.sum(s.store) > 0
        });
        if (storage) {
            switch(resourceType) {
                case 'energy':
                    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // TODO: amount parameter 지원
                        creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                    break;
                default:
                    throw new Error('Not defined resourceType');
            }
        }
    },

    getStatus: function(creep) {
        let storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE
        });
        if (storage) {
            return storage.store;
        } else {
            throw new Error('No storage nearby');
        }
    }
};
