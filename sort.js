let sortDirections = [1, 1, 1]; // 1 = asc, -1 = desc per column
let sortedColumn = -1;         // which column is currently sorted

document.addEventListener("DOMContentLoaded", () => {
  const thead = document.querySelector("#myTable thead");
  if (!thead) return;

  // Add chevron spans to each th
  thead.querySelectorAll("th").forEach((th, i) => {
    const chevron = document.createElement("span");
    chevron.className = "chevron";
    chevron.style.cssText =
      "display:inline-block;width:1em;margin-left:0.3em;font-size:0.8em;opacity:0.5;";
    chevron.textContent = "◇"; // straight line when not sorted
    th.appendChild(chevron);
  });
});

function parseCellValue(text) {
  const cleaned = text.trim();
  if (!cleaned || cleaned === '-' || cleaned === 'N/A') return NaN;

  // Percentage: "50%", "12.5%"
  if (cleaned.endsWith('%')) {
    const num = parseFloat(cleaned.slice(0, -1));
    if (!isNaN(num)) return num / 100;
  }

  // Number: "123", "45.67"
  const num = parseFloat(cleaned);
  if (!isNaN(num)) return num;

  // Date: flexible formats
  const date = new Date(cleaned);
  if (!isNaN(date.getTime())) return date.getTime();

  // Text
  return cleaned;
}

function sortTable(colIndex) {
  const table = document.querySelector("#myTable");
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const direction = sortDirections[colIndex];

  // Sort the rows
  rows.sort((a, b) => {
    const aVal = parseCellValue(a.cells[colIndex].textContent);
    const bVal = parseCellValue(b.cells[colIndex].textContent);
    let comp;
    if (typeof aVal === 'number' && typeof bVal === 'number' && !isNaN(aVal) && !isNaN(bVal)) {
      comp = aVal - bVal;
    } else {
      comp = String(aVal).localeCompare(String(bVal));
    }
    return comp * direction;
  });
  rows.forEach(r => table.querySelector("tbody").appendChild(r));

  // Update chevrons in headers
  document.querySelectorAll("#myTable thead .chevron").forEach((chev, i) => {
    if (i === colIndex) {
      chev.textContent = direction === 1 ? "▲" : "▼";
      chev.style.opacity = 1;
      sortedColumn = colIndex;
    } else {
      chev.textContent = "◇";
      chev.style.opacity = 0.5;
    }
  });

  // Flip direction for next click on this column
  sortDirections[colIndex] *= -1;
}