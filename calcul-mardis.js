document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("journees-list");

  if (!listContainer) return;

  const startDate = new Date("2025-09-01");
  const endDate = new Date("2026-05-31");

  function formatDateFR(date) {
    return date.toLocaleDateString("fr-CA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function getAllTuesdays(start, end) {
    const dates = [];
    const current = new Date(start);

    while (current.getDay() !== 2) {
      current.setDate(current.getDate() + 1);
    }

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 7);
    }

    return dates;
  }

  const tuesdays = getAllTuesdays(startDate, endDate);

  tuesdays.forEach((date, index) => {
    const row = document.createElement("div");
    row.className = "journee-row";

    const dateText = document.createElement("div");
    dateText.className = "journee-date";
    dateText.textContent = formatDateFR(date);

    const checkboxWrap = document.createElement("div");
    checkboxWrap.className = "journee-check";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `journee-${index}`;

    checkboxWrap.appendChild(checkbox);

    const viewButton = document.createElement("button");
    viewButton.className = "view-btn";
    viewButton.textContent = "Voir";
    viewButton.disabled = true;

    checkbox.addEventListener("change", () => {
      viewButton.disabled = !checkbox.checked;
    });

    row.appendChild(dateText);
    row.appendChild(checkboxWrap);
    row.appendChild(viewButton);

    listContainer.appendChild(row);
  });
});
