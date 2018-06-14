import {CapitolBuilder} from './capitol/CapitolBuilder';
import {CapitolDefender} from './capitol/CapitolDefender';
import {CapitolHauler} from './capitol/CapitolHauler';
import {CapitolHealer} from './capitol/CapitolHealer';
import {CapitolMiner} from './capitol/CapitolMiner';
import {CapitolRepairer} from './capitol/CapitolRepairer';
import {Builder} from './general/Builder';
import {Claimer} from './general/Claimer';
import {Cleaner} from './general/Cleaner';
import {Defender} from './general/Defender';
import {Explorer} from './general/Explorer';
import {Harvester} from './general/Harvester';
import {Hauler} from './general/Hauler';
import {Miner} from './general/Miner';
import {Miner2} from './general/Miner2';
import {MineralMiner} from './general/MineralMiner';
import {Pioneer} from './general/Pioneer';
import {Repairer} from './general/Repairer';
import {Reserver} from './general/Reserver';
import {Upgrader} from './general/Upgrader';
import {RemoteHarvester} from './remote/RemoteHarvester';
import {RemoteRepairer} from './remote/RemoteRepairer';

interface RoleMap {
  [creepType: string]: any;
}

export const roleMap: RoleMap = {
  capitolBuilder: CapitolBuilder,
  capitolDefender: CapitolDefender,
  capitolHauler: CapitolHauler,
  capitolHealer: CapitolHealer,
  capitolMiner: CapitolMiner,
  capitolRepairer: CapitolRepairer,
  builder: Builder,
  claimer: Claimer,
  cleaner: Cleaner,
  defender: Defender,
  explorer: Explorer,
  harvester: Harvester,
  hauler: Hauler,
  miner: Miner,
  miner2: Miner2,
  mineralMiner: MineralMiner,
  pioneer: Pioneer,
  repairer: Repairer,
  reserver: Reserver,
  upgrader: Upgrader,
  remoteHarvester: RemoteHarvester,
  remoteRepairer: RemoteRepairer
};
