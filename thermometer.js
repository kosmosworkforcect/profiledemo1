function getAnimatedThermometerSVG(endDegrees, heightPx) {
  // Calibration points (visually tuned)
  const deg100 = 100,   y100 = -18.3;  // 100° maps to y ≈ -18.3
  const deg20  = 20,    y20  = 26.8;   // 20°  maps to y ≈ 26.8

  // Linear deg → y map
  const m = (y100 - y20) / (deg100 - deg20);
  const b = y20 - m * deg20;
  const degToY = (deg) => m * deg + b;

  // White overlay geometry
  const y0   = -34;                    // top of white rectangle
  const h0   = degToY(0) - y0;         // full height when endDegrees = 0
  const hEnd = degToY(endDegrees) - y0; // height at endDegrees

  // Fill color logic
  const fillColor = endDegrees >= 67 ? "var(--red-color)"
                   : endDegrees >= 33 ? "var(--amber-color)"
                   : "var(--green-color)";

  // ViewBox and sizing
  const viewBoxWidth  = 47;
  const viewBoxHeight = 107;
  const viewBoxX      = 0;
  const viewBoxY      = -35;

  const finalHeight = heightPx || 400;
  const finalWidth  = finalHeight * (viewBoxWidth / viewBoxHeight);

  // Generate SVG string
  const svg = `
<svg viewBox="${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}"
     width="${finalWidth}" height="${finalHeight}"
     xmlns="http://www.w3.org/2000/svg">
  <!-- Thermometer body -->
  <rect x="1" y="-34" width="45" height="105" fill="var(--white-color)"
        stroke="#000" stroke-width="0.5" rx="5" />

  <!-- Colored mercury -->
  <path d="M29.36 37.78a1 1 0 0 1-.46-.84V-16.94a6 6 0 0 0-6-6 6 6 0 0 0-6 6V36.94a1 1 0 0 1-.46.84 12.19 12.19 0 0 0-5.52 10.76A12 12 0 0 0 35 48a12.19 12.19 0 0 0-5.64-10.22Z"
        fill="${fillColor}"/>

  <!-- White overlay that recedes (creates rise effect) -->
  <rect x="15" y="-33" width="20" height="${h0}" fill="var(--white-color)">
    <animate attributeName="height" from="${h0}" to="${hEnd}" dur="2s" fill="freeze" />
  </rect>

  <!-- Outline of mercury bulb and stem -->
  <path d="M29.36 37.78a1 1 0 0 1-.46-.84V-17a6 6 0 0 0-6-6 6 6 0 0 0-6 6V36.94a1 1 0 0 1-.46.84 12.19 12.19 0 0 0-5.52 10.76A12 12 0 0 0 35 48a12.19 12.19 0 0 0-5.64-10.22Z"
        fill="none" stroke="var(--black-color)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.5"/>

  <!-- Tick marks -->
  <path d="M29-17.3h-1.5M29-11.6h-1.5M29-6h-1.5M29-.3h-1.5M29 5.3h-1.5M29 10.9h-1.5M29 16.6h-1.5M29 22.2h-1.5M29 27.9h-1.5M29 33.5h-1.5" stroke="var(--black-color)" stroke-width="0.3"/>

  <!-- Degree labels -->
  <text x="27.5" y="-17.3" font-size="3.5" fill="var(--black-color)" text-anchor="end"
        stroke="var(--white-color)" stroke-width="0.1">100°</text>
  <text x="27.5" y="-6" font-size="3.5" fill="var(--black-color)" text-anchor="end"
        stroke="var(--white-color)" stroke-width="0.1">80°</text>
  <text x="27.5" y="5.3" font-size="3.5" fill="var(--black-color)" text-anchor="end"
        stroke="var(--white-color)" stroke-width="0.1">60°</text>
  <text x="27.5" y="16.6" font-size="3.5" fill="var(--black-color)" text-anchor="end"
        stroke="var(--white-color)" stroke-width="0.1">40°</text>
  <text x="27.5" y="27.9" font-size="3.5" fill="var(--black-color)" text-anchor="end"
        stroke="var(--white-color)" stroke-width="0.1">20°</text>

  <!-- Current degrees label -->
  <text x="44" y="-24" font-size="8" fill="var(--black-color)" text-anchor="end" font-weight="bold">
    ${endDegrees}°
  </text>
</svg>`;

  // Inject into DOM if script context exists
  if (typeof document !== "undefined" && document.currentScript) {
    document.currentScript.insertAdjacentHTML("afterend", svg);
  }

  return svg;
}