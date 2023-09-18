import { IDateUser, IMatchInfo, IRecommendationUserInfo } from 'shared/types';

export function getMatchesMap(matches: IMatchInfo[]) {
  const matchesMap: Record<string, IRecommendationUserInfo> = {};

  matches.forEach((match) => {
    matchesMap[match.matchedByUrl] = match.user;
  });

  return matchesMap;
}
