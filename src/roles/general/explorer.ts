import {Navigate} from '../../utils/Navigate';
import {GeneralRole} from './GeneralRole';

/**
 * 탐험가?
 */
export class Explorer extends GeneralRole {
  constructor(creep: Creep) {
    super(creep);
  }
  public run() {
    const targetFlag = Game.flags.explorerTarget;
    const navigate: Navigate = new Navigate(this.creep);

    if (!this.creep.memory.arrived) {
      navigate.toFlag(targetFlag);
    }
    this.creep.say('호-하!', true);
  }
}
