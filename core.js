const Core = (() => {
  const BASE_RATES = {
    learning: 20,
    revision: 15,
    analysis: 25,
    mock: 30
  };

  function levelFromXP(xp) {
    let level = 1;
    while (xp >= 100 * Math.pow(2, level - 2)) level++;
    return level;
  }

  function rankFromLevel(l) {
    if (l <= 3) return "E";
    if (l <= 5) return "D";
    if (l <= 7) return "C";
    if (l <= 9) return "B";
    if (l <= 11) return "A";
    return "S";
  }

  function multiplier(l) {
    if (l <= 3) return 1;
    if (l <= 5) return 1.1;
    if (l <= 7) return 1.25;
    if (l <= 9) return 1.4;
    if (l <= 11) return 1.6;
    return 1.8;
  }

  function calcXP(minutes, type, level) {
    if (minutes > 120) minutes = 120;
    return (minutes / 60) * BASE_RATES[type] * multiplier(level);
  }

  return { levelFromXP, rankFromLevel, calcXP };
})();
