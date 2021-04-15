/** Get percentage of goals done */
const getGoalsDone = (financedSoFar, disruptionIndex) => {
  return financedSoFar && disruptionIndex
    ? Math.min(
        Math.ceil((parseFloat(financedSoFar) / disruptionIndex) * 100),
        100
      ) || 0
    : 0;
};

export default getGoalsDone;
