import { IDateUser, IMatchInfo } from 'shared/types';

export function getMatchesMap(matches: IMatchInfo[]) {
  const matchesMap: Record<string, IDateUser> = {};

  matches.forEach((match) => {
    matchesMap[match.matchedByUrl] = match.user;
  });

  return matchesMap;
}
