function fiveSteps(green, amber, red) {
  const total = 5;
  const order = [];
  for (let i = 0; i < green; i++) order.push("green");
  for (let i = 0; i < amber; i++) order.push("amber");
  for (let i = 0; i < red; i++)  order.push("red");
  while (order.length < total) order.push("skip");
  if (order.length > total) order.splice(total);

  // Step index: 5,4,3,2,1
  const stepDefs = [
    {
      x: 240,
      y:  45,
      top:  "M0 0 L60 -45 L360 -45 L300 0 Z",
      body: "M0 0 L300 0 L300 135 L0 135 Z",
      side: "M300 0 L360 -45 L360 265 L300 340 Z",
      label: "Supervisor Validation"
    },
    {
      x: 180,
      y: 180,
      top:  "M0 0 L60 -45 L360 -45 L300 0 Z",
      body: "M0 0 L300 0 L300 135 L0 135 Z",
      side: "M300 0 L360 -45 L360 205 L300 280 Z",
      label: "Identify Mentor(s)"
    },
    {
      x: 120,
      y: 315,
      top:  "M0 0 L60 -45 L360 -45 L300 0 Z",
      body: "M0 0 L300 0 L300 135 L0 135 Z",
      side: "M300 0 L360 -45 L360 145 L300 220 Z",
      label: "Document Experience"
    },
    {
      x:  60,
      y: 450,
      top:  "M0 0 L60 -45 L360 -45 L300 0 Z",
      body: "M0 0 L300 0 L300 135 L0 135 Z",
      side: "M300 0 L360 -45 L360 85 L300 160 Z",
      label: "Demonstrate Skills"
    },
    {
      x:   0,
      y: 585,
      top:  "M0 0 L60 -45 L360 -45 L300 0 Z",
      body: "M0 0 L300 0 L300 100 L0 100 Z",
      side: "M300 0 L360 -45 L360 25 L300 100 Z",
      label: "Document Requirements"
    }
  ];

  for (let i = 0; i < total; i++) {
    const stepIndex = total - i; // 5,4,3,2,1
    const color = order[i];
    if (color === "skip") continue;
    stepDefs[stepIndex - 1].color = color;
  }

  let groups = "";

  stepDefs.forEach((d, i) => {
    if (!d.color) return;

    const topColor =
        d.color === "green" ? "var(--green-color)" :
        d.color === "amber" ? "var(--amber-color)" :
                              "var(--red-color)";
    const sideColor =
        `color-mix(in srgb, ${topColor}, black 40%)`;

    groups += `
      <g transform="translate(${d.x}, ${d.y})">
        <path d="${d.top}"  fill="${topColor}"  fill-opacity="0.6"/>
        <path d="${d.body}" fill="${topColor}"  fill-opacity="0.8"/>
        <path d="${d.side}" fill="${sideColor}"/>
        <text x="150" y="50" text-anchor="middle" fill="var(--white-color)">
          ${d.label}
        </text>
      </g>`;
  });

  const svg = `
    <svg viewBox="0 0 685 685" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${groups}
    </svg>`;

  const container = document.createElement("div");
  container.style.cssText = "max-width:685px; margin:20px auto;";

  const scripts = document.getElementsByTagName("script");
  const lastScript = scripts[scripts.length - 1];
  lastScript.parentNode.insertBefore(container, lastScript.nextSibling);

  container.innerHTML = svg;

  return svg;
}
