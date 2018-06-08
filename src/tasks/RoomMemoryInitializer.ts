const _ = require('lodash');

export class RoomMemoryInitializer {
  public room: Room;

  constructor(room: Room) {
    this.room = room;
  }

  public initialize(): void {
    if (_.isEmpty(this.room.memory)) {
      this.room.memory = {
        name: this.room.name
      };
    }
  }
}
