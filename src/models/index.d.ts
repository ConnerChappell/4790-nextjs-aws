import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TeamDataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TeamData {
  readonly id: string;
  readonly idTeam?: string;
  readonly team?: string;
  readonly teamShort?: string;
  readonly teamBadge?: string;
  readonly teamJersey?: string;
  readonly teamLogo?: string;
  readonly teamBanner?: string;
  readonly teamDescriptionEn?: string;
  readonly formedYear?: string;
  readonly sport?: string;
  readonly league?: string;
  readonly idLeague?: string;
  readonly stadium?: string;
  readonly stadiumThumb?: string;
  readonly stadiumDescription?: string;
  readonly stadiumLocation?: string;
  readonly stadiumCapacity?: string;
  readonly website?: string;
  readonly facebook?: string;
  readonly twitter?: string;
  readonly instagram?: string;
  readonly youtube?: string;
  readonly manager?: string;
  readonly country?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TeamData, TeamDataMetaData>);
  static copyOf(source: TeamData, mutator: (draft: MutableModel<TeamData, TeamDataMetaData>) => MutableModel<TeamData, TeamDataMetaData> | void): TeamData;
}