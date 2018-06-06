import {builder} from '../roles/builder';
import {claimer} from '../roles/claimer';
import {cleaner} from '../roles/cleaner';
import {harvester} from '../roles/harvester';
import {miner} from '../roles/miner';
import {miner2} from '../roles/miner2';
import {pioneer} from '../roles/pioneer';
import {remoteHarvester} from '../roles/remoteHarvester';
import {remoteRepairer} from '../roles/remoteRepairer';
import {repairer} from '../roles/repairer';
import {upgrader} from '../roles/upgrader';

interface RoleMap {
  [creepType: string]: any;
}

export const roleMap: RoleMap = {
  builder: builder,
  cleaner: cleaner,
  harvester: harvester,
  remoteHarvester: remoteHarvester,
  miner: miner,
  miner2: miner2,
  pioneer: pioneer,
  remoteRepairer: remoteRepairer,
  repairer: repairer,
  upgrader: upgrader,
  claimer: claimer
};
