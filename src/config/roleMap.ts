import {builder} from '../roles/builder';
import {claimer} from '../roles/claimer';
import {cleaner} from '../roles/cleaner';
import {defender} from '../roles/defender';
import {harvester} from '../roles/harvester';
import {miner} from '../roles/miner';
import {miner2} from '../roles/miner2';
import {mineralMiner} from '../roles/mineralMiner';
import {pioneer} from '../roles/pioneer';
import {remoteHarvester} from '../roles/remoteHarvester';
import {remoteRepairer} from '../roles/remoteRepairer';
import {repairer} from '../roles/repairer';
import {reserver} from '../roles/reserver';
import {upgrader} from '../roles/upgrader';

interface RoleMap {
  [creepType: string]: any;
}

export const roleMap: RoleMap = {
  builder: builder,
  claimer: claimer,
  cleaner: cleaner,
  defender: defender,
  harvester: harvester,
  miner: miner,
  miner2: miner2,
  mineralMiner: mineralMiner,
  pioneer: pioneer,
  remoteHarvester: remoteHarvester,
  remoteRepairer: remoteRepairer,
  repairer: repairer,
  reserver: reserver,
  upgrader: upgrader
};
