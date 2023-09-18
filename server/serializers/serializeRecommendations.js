export function serializeRecommendations(recommendations) {
  recommendations.users = recommendations.users.map((user) => {
    return {
      id: user.id,
      user: user,
      isLiked: false,
      isSkipped: false,
    };
  });
  return recommendations;
}
