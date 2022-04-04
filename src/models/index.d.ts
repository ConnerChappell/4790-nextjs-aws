import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TeamDataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TeamData {
  readonly id: string;
  readonly idTeam?: string | null;
  readonly team?: string | null;
  readonly teamShort?: string | null;
  readonly teamBadge?: string | null;
  readonly teamJersey?: string | null;
  readonly teamLogo?: string | null;
  readonly teamBanner?: string | null;
  readonly teamDescriptionEn?: string | null;
  readonly formedYear?: string | null;
  readonly sport?: string | null;
  readonly league?: string | null;
  readonly idLeague?: string | null;
  readonly stadium?: string | null;
  readonly stadiumThumb?: string | null;
  readonly stadiumDescription?: string | null;
  readonly stadiumLocation?: string | null;
  readonly stadiumCapacity?: string | null;
  readonly website?: string | null;
  readonly facebook?: string | null;
  readonly twitter?: string | null;
  readonly instagram?: string | null;
  readonly youtube?: string | null;
  readonly manager?: string | null;
  readonly country?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TeamData, TeamDataMetaData>);
  static copyOf(source: TeamData, mutator: (draft: MutableModel<TeamData, TeamDataMetaData>) => MutableModel<TeamData, TeamDataMetaData> | void): TeamData;
}