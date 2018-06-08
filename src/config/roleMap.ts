import {builder} from '../roles/builder';
import {capitolBuilder} from '../roles/capitolBuilder';
import {capitolDefender} from '../roles/capitolDefender';
import {capitolHauler} from '../roles/capitolHauler';
import {capitolHealer} from '../roles/capitolHealer';
import {capitolMiner} from '../roles/capitolMiner';
import {capitolRepairer} from '../roles/capitolRepairer';
import {claimer} from '../roles/claimer';
import {cleaner} from '../roles/cleaner';
import {defender} from '../roles/defender';
import {explorer} from '../roles/explorer';
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
  capitolBuilder: capitolBuilder,
  capitolDefender: capitolDefender,
  capitolHauler: capitolHauler,
  capitolHealer: capitolHealer,
  capitolMiner: capitolMiner,
  capitolRepairer: capitolRepairer,
  claimer: claimer,
  cleaner: cleaner,
  defender: defender,
  explorer: explorer,
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
