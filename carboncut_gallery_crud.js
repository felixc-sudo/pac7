// CARBONCUT Gallery Spotlight, Carbon Estimator & CRUD Task Controller

const GALLERY_PROJECTS = [
  {
    title: "Coastal Blue Carbon",
    desc: "Mangrove restoration and seagrass protection sequestering carbon 4x faster than terrestrial forests."
  },
  {
    title: "Reforestation Corridor",
    desc: "Native mixed-species woodland recovery across degraded watersheds with satellite verification."
  },
  {
    title: "EV Transit Corridor",
    desc: "Zero-emission electric freight hubs eliminating Scope 1 and Scope 3 diesel highway emissions."
  },
  {
    title: "Solar Microgrid",
    desc: "Distributed rooftop and community solar arrays replacing peak coal-fired grid electricity."
  },
  {
    title: "Alpine Watershed",
    desc: "High-altitude soil carbon conservation and glacial catchment biodiversity protection."
  },
  {
    title: "Offshore Wind Array",
    desc: "24/7 coastal wind turbine generation supplying clean renewable baseload power."
  },
  {
    title: "Wetland Carbon Sink",
    desc: "Peatland rewetting preventing legacy methane and CO2 release into the atmosphere."
  },
  {
    title: "Clean Hydro Basin",
    desc: "Low-impact run-of-river micro-hydro telemetry powering regional green manufacturing."
  }
];

let activeProjectIndex = 0;

function inspectProject(idx) {
  activeProjectIndex = idx;
  document.getElementById("spotTitle").textContent = GALLERY_PROJECTS[idx].title;
  document.getElementById("spotDesc").textContent = GALLERY_PROJECTS[idx].desc;
}

function setGridMode(mode, btn) {
  const grid = document.getElementById("carbonGalleryGrid");
  grid.classList.remove("force-desktop", "force-mobile");
  if (mode === "desktop") grid.classList.add("force-desktop");
  if (mode === "mobile") grid.classList.add("force-mobile");

  document.querySelectorAll(".cc-chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
}

// CRUD Task Array
const INITIAL_TASKS = [
  { id: 1, text: "Switch office energy contract to 100% Solar Microgrid tariff", done: true },
  { id: 2, text: "Allocate 3.0 tonnes CO2e offset to Coastal Blue Carbon project", done: false },
  { id: 3, text: "Transition employee commute reimbursements to EV Transit Corridor", done: false }
];

let tasks = JSON.parse(localStorage.getItem("carboncut_gallery_tasks_v1")) || [...INITIAL_TASKS];

function saveTasks() {
  localStorage.setItem("carboncut_gallery_tasks_v1", JSON.stringify(tasks));
}

// READ
function renderTasks() {
  const ul = document.getElementById("taskUl");
  const stats = document.getElementById("taskStats");
  ul.innerHTML = "";

  const completed = tasks.filter(t => t.done).length;
  stats.textContent = `${completed} of ${tasks.length} reduction milestones completed`;

  if (tasks.length === 0) {
    ul.innerHTML = `<li class="cc-task-row"><span>No reduction tasks yet. Add a task above!</span></li>`;
    return;
  }

  tasks.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "cc-task-row";
    li.innerHTML = `
      <div class="cc-task-main">
        <input type="checkbox" ${item.done ? "checked" : ""} onchange="toggleTask(${index})" />
        <span class="${item.done ? "cc-done" : ""}">${escapeHtml(item.text)}</span>
      </div>
      <div class="cc-actions">
        <button type="button" class="cc-mini" onclick="editTask(${index})">Edit</button>
        <button type="button" class="cc-mini del" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

// CREATE (onclick="addTask()")
function addTask() {
  const input = document.getElementById("taskInputBox");
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }
  tasks.unshift({ id: Date.now(), text, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function addSpotlightToTasks() {
  const proj = GALLERY_PROJECTS[activeProjectIndex];
  tasks.unshift({
    id: Date.now(),
    text: `Fund verified carbon reduction via ${proj.title}`,
    done: false
  });
  saveTasks();
  renderTasks();
  document.getElementById("crud-checklist").scrollIntoView({ behavior: "smooth" });
}

// UPDATE
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const updated = prompt("Update carbon reduction milestone:", tasks[index].text);
  if (updated !== null && updated.trim() !== "") {
    tasks[index].text = updated.trim();
    saveTasks();
    renderTasks();
  }
}

// DELETE
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function resetTasks() {
  tasks = [...INITIAL_TASKS];
  saveTasks();
  renderTasks();
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

// Carbon Calculator
function runCarbonCalc() {
  const kwh = Number(document.getElementById("elecSlider").value);
  const km = Number(document.getElementById("kmSlider").value);
  const diet = Number(document.getElementById("dietMenu").value);

  document.getElementById("elecOut").textContent = kwh;
  document.getElementById("kmOut").textContent = km;

  const monthly = Math.round((kwh * 0.72) + (km * 4.33 * 0.21) + diet);
  const annual = ((monthly * 12) / 1000).toFixed(2);

  document.getElementById("monthKg").textContent = monthly;
  document.getElementById("yearTonnes").textContent = annual;

  const badge = document.getElementById("calcBadge");
  if (monthly < 450) {
    badge.textContent = "Low Footprint — Aligned with Net-Zero pathway";
  } else if (monthly <= 750) {
    badge.textContent = "Moderate — 22% reduction possible via Solar Microgrid";
  } else {
    badge.textContent = "High Footprint — Priority offset & clean energy shift advised";
  }
}

document.getElementById("taskInputBox").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

runCarbonCalc();
renderTasks();
