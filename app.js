(async function () {
  await openDB();

  const view = document.getElementById("view");
  const state = meta("state") || {
    xp: 0,
    gold: 0,
    startDate: Date.now(),
    history: []
  };

  function save() {
    meta("state", state);
  }

  function dashboard() {
    const level = Core.levelFromXP(state.xp);
    const rank = Core.rankFromLevel(level);
    view.innerHTML = `
      <div class="card">
        <div class="stat"><span>Level</span><span>${level}</span></div>
        <div class="stat"><span>Rank</span><span>${rank}</span></div>
        <div class="stat"><span>XP</span><span>${Math.floor(state.xp)}</span></div>
        <div class="stat"><span>Gold</span><span>${Math.floor(state.gold)}</span></div>
      </div>
    `;
  }

  function study() {
    view.innerHTML = `
      <div class="card">
        <p>Start verified study session.</p>
        <button class="primary" id="start">Start</button>
        <p class="warning">Minimum 20 minutes required</p>
      </div>
    `;
    document.getElementById("start").onclick = () => {
      const start = Date.now();
      alert("Timer started. Return after completion.");
      setTimeout(() => {
        const mins = Math.floor((Date.now() - start) / 60000);
        if (mins < 20) {
          alert("Failure: insufficient duration");
          return;
        }
        const lvl = Core.levelFromXP(state.xp);
        const xp = Core.calcXP(mins, "learning", lvl);
        state.xp += xp;
        state.gold += xp / 10;
        save();
        dashboard();
      }, 1000);
    };
  }

  function awakening() {
    view.innerHTML = `
      <div class="card">
        <h3>Vision</h3>
        <p>Selection. Stability. Respect.</p>
        <h3>Anti-Vision</h3>
        <p>Regret. Repetition. Wasted years.</p>
      </div>
    `;
  }

  function report() {
    view.innerHTML = `
      <div class="card">
        <p>Offline report available in future versions.</p>
      </div>
    `;
  }

  const routes = { dashboard, study, awakening, report };

  document.querySelectorAll("nav button").forEach(btn => {
    btn.onclick = () => routes[btn.dataset.view]?.();
  });

  dashboard();
})();
