/* Core Discipline Logic – No UI */

const Core = (() => {
  const BASE_RATE = {
    learning: 20,
    revision: 15,
    analysis: 25,
    mock: 30
  };

  function xpForLevel(level) {
    return 100 * Math.pow(2, level - 2);
  }

  function levelFromXP(xp) {
    let lvl = 1;
    while (xp >= xpForLevel(lvl)) lvl++;
    return lvl;
  }

  function multiplier(level) {
    if (level <= 3) return 1;
    if (level <= 5) return 1.1;
    if (level <= 7) return 1.25;
    if (level <= 9) return 1.4;
    if (level <= 11) return 1.6;
    return 1.8;
  }

  function calcXP(minutes, type, level) {
    const capped = Math.min(minutes, 120);
    return (capped / 60) * BASE_RATE[type] * multiplier(level);
  }

  return { levelFromXP, calcXP };
})();
