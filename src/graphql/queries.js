/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTeamData = /* GraphQL */ `
  query GetTeamData($id: ID!) {
    getTeamData(id: $id) {
      id
      idTeam
      team
      teamShort
      teamBadge
      teamJersey
      teamLogo
      teamBanner
      teamDescriptionEn
      formedYear
      sport
      league
      idLeague
      stadium
      stadiumThumb
      stadiumDescription
      stadiumLocation
      stadiumCapacity
      website
      facebook
      twitter
      instagram
      youtube
      manager
      country
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTeamData = /* GraphQL */ `
  query ListTeamData(
    $filter: ModelTeamDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        idTeam
        team
        teamShort
        teamBadge
        teamJersey
        teamLogo
        teamBanner
        teamDescriptionEn
        formedYear
        sport
        league
        idLeague
        stadium
        stadiumThumb
        stadiumDescription
        stadiumLocation
        stadiumCapacity
        website
        facebook
        twitter
        instagram
        youtube
        manager
        country
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTeamData = /* GraphQL */ `
  query SyncTeamData(
    $filter: ModelTeamDataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTeamData(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        idTeam
        team
        teamShort
        teamBadge
        teamJersey
        teamLogo
        teamBanner
        teamDescriptionEn
        formedYear
        sport
        league
        idLeague
        stadium
        stadiumThumb
        stadiumDescription
        stadiumLocation
        stadiumCapacity
        website
        facebook
        twitter
        instagram
        youtube
        manager
        country
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
