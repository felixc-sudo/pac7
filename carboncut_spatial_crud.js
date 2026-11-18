// CARBONCUT Spatial Telemetry & CRUD Task Array Controller

const SAMPLE_MILESTONES = [
  { id: 1, text: "Transition Scope 2 facility power to 100% solar microgrid", done: true },
  { id: 2, text: "Electrify regional courier fleet to cut Scope 1 emissions by 40%", done: false },
  { id: 3, text: "Retire 5.0 tonnes CO2e via verified mangrove restoration credits", done: false }
];

let reductionTasks = JSON.parse(localStorage.getItem("carboncut_pos_tasks_v1")) || [...SAMPLE_MILESTONES];

function persistTasks() {
  localStorage.setItem("carboncut_pos_tasks_v1", JSON.stringify(reductionTasks));
}

// READ: Render task array
function renderTaskList() {
  const ul = document.getElementById("reductionTaskList");
  const stats = document.getElementById("crudStats");
  ul.innerHTML = "";

  const doneTotal = reductionTasks.filter(item => item.done).length;
  stats.textContent = `${doneTotal} of ${reductionTasks.length} reduction milestones completed`;

  if (reductionTasks.length === 0) {
    ul.innerHTML = `<li class="cc-task-row"><span>No reduction tasks yet. Enter one in the input box above.</span></li>`;
    return;
  }

  reductionTasks.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "cc-task-row";
    li.innerHTML = `
      <div class="cc-task-info">
        <input type="checkbox" ${item.done ? "checked" : ""} onchange="toggleTaskDone(${idx})" />
        <span class="${item.done ? "cc-completed" : ""}">${sanitize(item.text)}</span>
      </div>
      <div class="cc-row-actions">
        <button type="button" class="cc-sm-btn" onclick="updateTaskText(${idx})">Edit</button>
        <button type="button" class="cc-sm-btn danger" onclick="removeTask(${idx})">Delete</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

// CREATE: Triggered by Add button onclick="addTask()"
function addTask() {
  const inputEl = document.getElementById("reductionTaskInput");
  const cleanText = inputEl.value.trim();
  if (!cleanText) {
    inputEl.focus();
    return;
  }
  reductionTasks.unshift({
    id: Date.now(),
    text: cleanText,
    done: false
  });
  inputEl.value = "";
  persistTasks();
  renderTaskList();
}

// UPDATE (Status)
function toggleTaskDone(idx) {
  reductionTasks[idx].done = !reductionTasks[idx].done;
  persistTasks();
  renderTaskList();
}

// UPDATE (Text)
function updateTaskText(idx) {
  const nextVal = prompt("Edit carbon reduction milestone:", reductionTasks[idx].text);
  if (nextVal !== null && nextVal.trim() !== "") {
    reductionTasks[idx].text = nextVal.trim();
    persistTasks();
    renderTaskList();
  }
}

// DELETE
function removeTask(idx) {
  reductionTasks.splice(idx, 1);
  persistTasks();
  renderTaskList();
}

function restoreDefaultTasks() {
  reductionTasks = [...SAMPLE_MILESTONES];
  persistTasks();
  renderTaskList();
}

function sanitize(text) {
  return text.replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

// Carbon Footprint Calculator
function updateCarbonCalc() {
  const kwh = Number(document.getElementById("powerInput").value);
  const km = Number(document.getElementById("kmInput").value);
  const diet = Number(document.getElementById("dietInput").value);

  document.getElementById("powerLabel").textContent = kwh;
  document.getElementById("kmLabel").textContent = km;

  const monthlyKg = Math.round((kwh * 0.72) + (km * 4.33 * 0.21) + diet);
  const annualT = ((monthlyKg * 12) / 1000).toFixed(2);

  document.getElementById("monthResult").textContent = monthlyKg;
  document.getElementById("yearResult").textContent = annualT;

  const badge = document.getElementById("ratingBadge");
  if (monthlyKg < 460) {
    badge.textContent = "Low Impact — Aligned with 1.5°C Net-Zero pathway";
  } else if (monthlyKg <= 760) {
    badge.textContent = "Moderate Footprint — Solar & EV shift saves ~2.1 t/yr";
  } else {
    badge.textContent = "High Footprint — Immediate Scope 2 & 3 audit advised";
  }
}

function pushCalcToTasks() {
  const annualT = document.getElementById("yearResult").textContent;
  reductionTasks.unshift({
    id: Date.now(),
    text: `Offset ${annualT} tonnes CO2e/year via CARBONCUT verified reduction portfolio`,
    done: false
  });
  persistTasks();
  renderTaskList();
  document.getElementById("action-crud").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("reductionTaskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Boot
updateCarbonCalc();
renderTaskList();
