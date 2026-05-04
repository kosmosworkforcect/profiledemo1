// Define the class for your component
class Navmenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
	<input type="checkbox" id="nav-toggle" class="nav-toggle-checkbox" />
	<label for="nav-toggle" class="nav-toggle">&vellip;</label>

	<!-- LEFT NAVIGATION -->
	<div class="nav-left">
		<div onclick="window.location.href='index.html'"><img src="images/KosmosWorkforceLogoWhite.png" width="184px" height="auto"></div>
		<div data-link="index.html" onclick="window.location.href='index.html'">
			<svg xmlns="http://www.w3.org/2000/svg" 
				width="24" height="24" viewBox="0 0 24 24" fill="none"
				stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
				aria-hidden="true">
				<rect width="7" height="9" x="3" y="3" rx="1"></rect>
				<rect width="7" height="5" x="14" y="3" rx="1"></rect>
				<rect width="7" height="9" x="14" y="12" rx="1"></rect>
				<rect width="7" height="5" x="3" y="16" rx="1"></rect>
			</svg>Dashboard
		</div>	
		<div data-link="individual.html" onclick="window.location.href='individual.html'">
			<svg xmlns="http://www.w3.org/2000/svg" 
				width="24" height="24" viewBox="0 0 24 24" fill="none" 
				stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
				aria-hidden="true">
				<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
				<circle cx="9" cy="7" r="4"></circle>
			</svg>Profile
		</div>
		<div onclick="alert('This page doesn\\'t exist yet!')">
			<svg xmlns="http://www.w3.org/2000/svg" 
				width="24" height="24" viewBox="0 0 24 24" fill="none" 
				stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
				aria-hidden="true">
				<rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
				<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
				<path d="M12 11h4"></path>
				<path d="M12 16h4"></path>
				<path d="M8 11h.01"></path><path d="M8 16h.01"></path>
			</svg>Assignments
		</div>
		<div onclick="alert('This page doesn\\'t exist yet!')">
			<svg xmlns="http://www.w3.org/2000/svg" 
				width="24" height="24" viewBox="0 0 24 24" fill="none" 
				stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
				aria-hidden="true">
				<path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
				<path d="M18 17V9"></path>
				<path d="M13 17V5"></path>
				<path d="M8 17v-3"></path>
			</svg>Results
		</div>
		<div onclick="alert('This page doesn\\'t exist yet!')">
			<svg xmlns="http://www.w3.org/2000/svg"
				width="24" height="24" viewBox="0 0 24 24" fill="none"
				stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
				aria-hidden="true">
				<path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path>
				<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
			</svg>Sign Out
		</div>
	</div><!-- END OF NAVIGATION PANE -->
    `;

    // Highlighting Logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const items = this.querySelectorAll('.nav-left > div');

    items.forEach(item => {
      // Compare the stored data-link attribute to the current file name
      if (item.getAttribute('data-link') === currentPath) {
        item.classList.add('current');
      }
    });
  }
}

customElements.define('left-nav', Navmenu);