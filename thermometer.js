function getAnimatedThermometerSVG(endDegrees, heightPx) {
  const heightStart = 46.5 + (40 - 0) * 0.55;
  const heightEnd   = 46.5 + (40 - endDegrees) * 0.55;
  const fillColor   = endDegrees >= 40 ? "red"
                   : endDegrees >= 20 ? "orange"
                   : "green";

  const viewBoxWidth  = 46;
  const viewBoxHeight = 105;
  const viewBoxX      = 0;
  const viewBoxY      = -35; 

  const finalHeight = heightPx || 400;
  const finalWidth  = finalHeight * (viewBoxWidth / viewBoxHeight);

  const svg = `
<svg viewBox="${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}"
     width="${finalWidth}" height="${finalHeight}"
     xmlns="http://www.w3.org/2000/svg">
  <!-- Rounded corners increased with rx="5" -->
  <rect x="0" y="-35" width="46" height="105" fill="white"
    stroke="#000" stroke-width="0.5" rx="5" />
  
  <path d="M29.36 37.78a1 1 0 0 1-.46-.84V-16.94a6 6 0 0 0-6-6 6 6 0 0 0-6 6V36.94a1 1 0 0 1-.46.84 12.19 12.19 0 0 0-5.52 10.76A12 12 0 0 0 35 48a12.19 12.19 0 0 0-5.64-10.22Z"
    fill="${fillColor}"/>
  <rect x="15" y="-34" width="20" height="${heightStart}" fill="white">
    <animate attributeName="height" from="${heightStart}" to="${heightEnd}" dur="2s" fill="freeze" />
  </rect>
  <path d="M29.36 37.78a1 1 0 0 1-.46-.84V-17a6 6 0 0 0-6-6 6 6 0 0 0-6 6V36.94a1 1 0 0 1-.46.84 12.19 12.19 0 0 0-5.52 10.76A12 12 0 0 0 35 48a12.19 12.19 0 0 0-5.64-10.22Z"
    fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.5"/>
  <path d="M29-17.3h-1.5M29-11.6h-1.5M29-6h-1.5M29-.3h-1.5M29 5.3h-1.5M29 10.9h-1.5M29 16.6h-1.5M29 22.2h-1.5M29 27.9h-1.5M29 33.5h-1.5" stroke="#000" stroke-width="0.3"/>
  <text x="27.5" y="-17.3" font-size="3.5" fill="#000" text-anchor="end"
    stroke="white" stroke-width="0.1">100°</text>
  <text x="27.5" y="-6" font-size="3.5" fill="#000" text-anchor="end"
    stroke="white" stroke-width="0.1">80°</text>
  <text x="27.5" y="5.3" font-size="3.5" fill="#000" text-anchor="end"
    stroke="white" stroke-width="0.1">60°</text>
  <text x="27.5" y="16.6" font-size="3.5" fill="#000" text-anchor="end"
    stroke="white" stroke-width="0.1">40°</text>
  <text x="27.5" y="27.9" font-size="3.5" fill="#000" text-anchor="end"
    stroke="white" stroke-width="0.1">20°</text>

  <!-- New label for current degrees -->
  <text x="44" y="-24" font-size="8" fill="#000" text-anchor="end" font-weight="bold">
    ${endDegrees}°
  </text>

</svg>`;

  if (typeof document !== "undefined" && document.currentScript) {
    document.currentScript.insertAdjacentHTML("afterend", svg);
  }
  return svg;
}