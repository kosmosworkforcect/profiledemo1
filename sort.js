let sortDirections = [1, 1, 1, 1]; // 1 = asc, -1 = desc per column
let sortedColumn = -1; // which column is currently sorted

document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("#myTable");
    const thead = table?.querySelector("thead");
    const tbody = table?.querySelector("tbody");
    
    if (!thead || !tbody) return;

    const headers = thead.querySelectorAll("th");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    headers.forEach((th, i) => {
        // 1. Add chevron spans to each th
        const chevron = document.createElement("span");
        chevron.className = "chevron";
        chevron.style.cssText = "display:inline-block; width:1em; height: 1em; margin-left:0.3em; transform: scale(0.75, 1.25); opacity:0.5;";
        chevron.textContent = "◇"; // show when not sorted
        th.appendChild(chevron);

        // 2. Detection Logic: Center text if the first row of this column is a number
        if (rows.length > 0) {
            const sampleValue = parseCellValue(rows[0].cells[i].textContent);
            
            // If the parsed value is a number (and not NaN), center the column
            if (typeof sampleValue === 'number' && !isNaN(sampleValue)) {
                th.style.textAlign = "center";
                rows.forEach(row => {
                    if (row.cells[i]) {
                        row.cells[i].style.textAlign = "center";
                    }
                });
            }
        }
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

    // Date: flexible formats
    const date = new Date(cleaned);
    if (!isNaN(date.getTime()) && isNaN(Number(cleaned))) { 
        // Note: We check isNaN(Number) to ensure strings like "2024" 
        // are treated as numbers, not dates
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            time: date.getTime()
        };
    }

    // Number: "123", "45.67"
    const num = parseFloat(cleaned);
    if (!isNaN(num)) return num;

    // Text
    return cleaned;
}

function sortTable(colIndex) {
    const table = document.querySelector("#myTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const direction = sortDirections[colIndex];

    // Sort the rows
    rows.sort((a, b) => {
        const aVal = parseCellValue(a.cells[colIndex].textContent);
        const bVal = parseCellValue(b.cells[colIndex].textContent);

        let comp;
        if (
            aVal && bVal &&
            typeof aVal === 'object' && typeof bVal === 'object' &&
            'year' in aVal && 'year' in bVal
        ) {
            comp = aVal.year - bVal.year || aVal.month - bVal.month || aVal.day - bVal.day;
        } else if (typeof aVal === 'number' && typeof bVal === 'number' && !isNaN(aVal) && !isNaN(bVal)) {
            comp = aVal - bVal;
        } else {
            comp = String(aVal).localeCompare(String(bVal));
        }
        return comp * direction;
    });

    // Re-append rows in new order
    rows.forEach(r => tbody.appendChild(r));

    // Update chevrons in headers
    document.querySelectorAll("#myTable thead .chevron").forEach((chev, i) => {
        if (i === colIndex) {
            chev.textContent = direction === 1 ? "▲" : "▼";
            sortedColumn = colIndex;
        } else {
            chev.textContent = "◇";
        }
    });

    // Flip direction for next click
    sortDirections[colIndex] *= -1;
}
