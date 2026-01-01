(async () => {
  await openDB();

  const state = meta("state") || {
    xp: 0,
    gold: 0,
    history: []
  };

  function save() {
    meta("state", state);
  }

  function refresh() {
    state.level = Core.levelFromXP(state.xp);
    renderDashboard(state);
  }

  window.startStudy = () => {
    const start = Date.now();
    alert("Study started.");
    setTimeout(() => {
      const mins = Math.floor((Date.now() - start) / 60000);
      if (mins < 20) {
        alert("Failure: minimum time not met");
        return;
      }
      const xp = Core.calcXP(mins, "learning", state.level);
      state.xp += xp;
      state.gold += xp / 10;
      save();
      refresh();
    }, 1000);
  };

  refresh();
})();
