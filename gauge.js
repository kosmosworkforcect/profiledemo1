// gauge.js — reusable SVG gauge generator with auto-ID and animated needle

let gaugeCount = 0; // auto-increment counter for unique IDs

const SVG_NS = 'http://www.w3.org/2000/svg';
const CX = 180, CY = 180;
const START = 150, TOTAL = 240;
const MINW = 7, MAXW = 34;
const R = 128, NEEDLE = 152;

const deg = r => r * Math.PI / 180;
const polar = (a, d) => ({ x: CX + d * Math.cos(deg(a)), y: CY + d * Math.sin(deg(a)) });
const valA = v => START + (v / 100) * TOTAL;
const valW = v => MINW + (v / 100) * (MAXW - MINW);
const col = v => v <= 50 ? '#e03a3a' : v <= 80 ? '#e09820' : '#28b355';

function makeGauge(container, label, val = 50) {
  const id = "gauge" + (++gaugeCount); // auto-generated unique id

  // Inject SVG markup into the container
  container.insertAdjacentHTML('beforeend', `
  <div class="gauge-wrap">
    <svg class="gauge" viewBox="0 0 360 360" width="180" height="180" id="${id}">
      <defs><clipPath id="clip-${id}"><circle cx="180" cy="180" r="162"/></clipPath></defs>
      <circle cx="180" cy="180" r="162" fill="#ffffff"/>
      <g clip-path="url(#clip-${id})">
        <g class="arc"></g>
        <g class="ticks"></g>
        <text class="val" x="180" y="258" text-anchor="middle" font-size="56" fill="#1a2030">0</text>
        <text x="180" y="284" text-anchor="middle" font-size="11" font-weight="500" letter-spacing="3" fill="#aab4c4">${label}</text>
        <line class="needle" stroke="#1a2030" stroke-width="3" stroke-linecap="round"/>
        <polygon class="tip" fill="#1a2030"/>
        <circle cx="180" cy="180" r="11" fill="#1a2030"/>
        <circle cx="180" cy="180" r="5" fill="#ffffff"/>
      </g>
      <circle cx="180" cy="180" r="162" fill="none" stroke="#c8d0dc" stroke-width="2"/>
    </svg>
  </div>`);

  const svg = document.getElementById(id);
  const arc = svg.querySelector('.arc');
  const ticks = svg.querySelector('.ticks');
  const needle = svg.querySelector('.needle');
  const tip = svg.querySelector('.tip');
  const valtx = svg.querySelector('.val');

  // Colored arc
  for (let i = 0; i < 240; i++) {
    const v = (i / 240) * 100;
    const a1 = valA(v), a2 = valA((i + 1) / 240 * 100);
    const p1 = polar(a1, R), p2 = polar(a2, R);
    const l = document.createElementNS(SVG_NS, 'line');
    l.setAttribute('x1', p1.x); l.setAttribute('y1', p1.y);
    l.setAttribute('x2', p2.x); l.setAttribute('y2', p2.y);
    l.setAttribute('stroke', col(v));
    l.setAttribute('stroke-width', valW(v));
    arc.appendChild(l);
  }

  // Ticks and labels
  for (let v = 0; v <= 100; v += 5) {
    const a = valA(v);
    const maj = v % 25 === 0;
    const rO = R - (MAXW / 2) - 3;
    const rI = rO - (maj ? 10 : 6);
    const p1 = polar(a, rO), p2 = polar(a, rI);
    const t = document.createElementNS(SVG_NS, 'line');
    t.setAttribute('x1', p1.x); t.setAttribute('y1', p1.y);
    t.setAttribute('x2', p2.x); t.setAttribute('y2', p2.y);
    t.setAttribute('stroke', maj ? '#8898aa' : '#bbc8d8');
    t.setAttribute('stroke-width', maj ? 2 : 1);
    ticks.appendChild(t);
    if (maj) {
      const lp = polar(a, rI - 11);
      const tx = document.createElementNS(SVG_NS, 'text');
      tx.setAttribute('x', lp.x);
      tx.setAttribute('y', lp.y);
      tx.setAttribute('text-anchor', 'middle');
      tx.setAttribute('dominant-baseline', 'middle');
      tx.setAttribute('fill', '#8898aa');
      tx.setAttribute('font-size', '10');
      tx.textContent = v;
      ticks.appendChild(tx);
    }
  }

  // Set the needle position and numeric label
  const set = v => {
    const a = valA(v);
    const rad = deg(a);
    const tipX = CX + NEEDLE * Math.cos(rad);
    const tipY = CY + NEEDLE * Math.sin(rad);
    const backX = tipX - 16 * Math.cos(rad);
    const backY = tipY - 16 * Math.sin(rad);
    const perpX = -Math.sin(rad);
    const perpY = Math.cos(rad);
    const pts = `${tipX},${tipY} ${backX + 6 * perpX},${backY + 6 * perpY} ${backX - 6 * perpX},${backY - 6 * perpY}`;
    tip.setAttribute('points', pts);
    needle.setAttribute('x1', CX - 10 * Math.cos(rad));
    needle.setAttribute('y1', CY - 10 * Math.sin(rad));
    needle.setAttribute('x2', backX);
    needle.setAttribute('y2', backY);
    valtx.textContent = Math.round(v);
    valtx.setAttribute('fill', col(v));
  };

  // Animate from 0 → target value
  const animateTo = target => {
    let valNow = 0;
    const start = performance.now();
    const duration = 1000; // 1 second
    function step(t) {
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      valNow = target * eased;
      set(valNow);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  animateTo(val);
}