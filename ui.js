/* UI Rendering Only */

function renderDashboard(state) {
  const root = document.getElementById("app-root");
  root.innerHTML = `
    <div class="card">
      <h2>Level ${state.level}</h2>
      <p>XP: ${Math.floor(state.xp)}</p>
      <p>Gold: ${Math.floor(state.gold)}</p>
    </div>
    <button onclick="startStudy()">Start Verified Study</button>
  `;
}
