export interface RoomSettings {
  spawn: {
    name: string;
  };
  creep: {
    [creepType: string]: {
      population: number;
      initialMemory: any;
      priority: number;
      parts: BodyPartConstant[];
    };
  };
  dispatch?: {
    [creepType: string]: {
      fromRoom: string;
      fromSpawn: string;
      population: number;
      initialMemory: any;
      parts: BodyPartConstant[];
    };
  };
}
