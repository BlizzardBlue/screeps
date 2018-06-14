const _ = require('lodash');

import {settings} from '../config/settings';
import {Coupang} from '../managers/Coupang';

export class PickupMinedEnergy {
  private coupang: Coupang;

  constructor() {
    this.coupang = new Coupang();
  }

  public run() {
    for (const roomName of Object.keys(settings.mines)) {
      const containers = Game.rooms[roomName].find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.energy > 500
      });
      for (const container of containers) {

        this.coupang.newJob(container.id, settings.mines[roomName].to, 'energy', 500);
      }
    }
  }
}
