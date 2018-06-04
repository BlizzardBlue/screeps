var coreIntel = {
    room1: { // TODO: Refactoring
        sources: {
            primary: {
                object: Game.getObjectById('ef990774d80108c'),
                seats: 4,
                x: 36,
                y: 30
            },
            secondary: {
                object: Game.getObjectById('ba3c0774d80c3a8'),
                seats: 3,
                x: 15,
                y: 24
            }
        }
    },
    rooms: {
        home: {
            name: 'W1N7',
            object: Game.rooms.W1N7,
            entrance: {
                roomPosition: new RoomPosition(36, 26, 'W1N7'),
                x: 36,
                y: 26
            }
        },
        W2N7: {
            name: 'W2N7',
            object: Game.rooms.W2N7,
            sources: {
                primary: {
                    object: Game.getObjectById('25020774762401f'),
                    roomPosition: new RoomPosition(19, 39, 'W2N7'),
                    seats: 4,
                    x: 19,
                    y: 39
                },
                secondary: {
                    object: Game.getObjectById('147e0774762a341'),
                    roomPosition: new RoomPosition(14, 14, 'W2N7'),
                    seats: 4,
                    x: 14,
                    y: 14
                }
            }
        }
    },
    expansion: {
        mining: {
            rooms: ['W2N7']
        }
    }
};

module.exports = coreIntel;
