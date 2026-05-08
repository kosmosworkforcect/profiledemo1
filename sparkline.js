function sparkLine(percent) {
	var p = Number(percent);
	if (!isFinite(p)) p = 0;
	p = Math.max(0, Math.min(100, p));

	var color = 'var(--red-color)';
	if (p == 100) color = 'var(--primary-color)';
	else if (p >= 80) color = 'var(--green-color)';
 	else if (p >= 60) color = 'var(--amber-color)';

	return `
		<svg width="108px" height="24" style="display: block; margin-top: -8px;">
			<rect x="7" y="7" width="0" height="16" rx="4" ry="4"
				style="fill:${color};">
				<animate attributeName="width" from="0" to="${p}" begin="0s" dur="1s" fill="freeze" />
			</rect>
			<rect x="7" y="7" width="100" height="16" rx="4" ry="4"
				style="fill:none; stroke:var(--primary-color); stroke-width:1;">
			</rect>
		</svg>
	`.trim();
}