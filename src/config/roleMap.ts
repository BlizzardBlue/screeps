import {builder} from '../roles/general/builder';
import {capitolBuilder} from '../roles/capitol/capitolBuilder';
import {capitolDefender} from '../roles/capitol/capitolDefender';
import {capitolHauler} from '../roles/capitol/capitolHauler';
import {capitolHealer} from '../roles/capitol/capitolHealer';
import {capitolMiner} from '../roles/capitol/capitolMiner';
import {capitolRepairer} from '../roles/capitol/capitolRepairer';
import {claimer} from '../roles/general/claimer';
import {cleaner} from '../roles/general/cleaner';
import {defender} from '../roles/general/defender';
import {explorer} from '../roles/general/explorer';
import {harvester} from '../roles/general/harvester';
import {miner} from '../roles/general/miner';
import {miner2} from '../roles/general/miner2';
import {mineralMiner} from '../roles/general/mineralMiner';
import {pioneer} from '../roles/general/pioneer';
import {remoteHarvester} from '../roles/remote/remoteHarvester';
import {remoteRepairer} from '../roles/remote/remoteRepairer';
import {repairer} from '../roles/general/repairer';
import {reserver} from '../roles/general/reserver';
import {upgrader} from '../roles/general/upgrader';

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
