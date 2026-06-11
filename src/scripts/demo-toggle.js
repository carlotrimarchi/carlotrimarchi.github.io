function initDemoToggle(root) {
	if (!root || root.dataset.toggleReady === "true") {
		return;
	}

	const controls = root.querySelectorAll(".demo-toggle__button");
	const panels = root.querySelectorAll(".demo-toggle__panel");
	const previewPanel = root.querySelector("[data-panel='preview']");
	const preview = root.querySelector("[data-preview]");
	const code = root.querySelector("[data-panel='code'] pre code");
	const manualPreview = root.querySelector("[data-panel='code'] [data-demo-preview]");

	if (manualPreview instanceof HTMLTemplateElement) {
		// inline HTML via <template data-demo-preview>
		if (preview) preview.appendChild(manualPreview.content.cloneNode(true));
	} else if (manualPreview) {
		// compiled demo-embed (or any element) with data-demo-preview: move to preview panel
		const internalWrapper = previewPanel && previewPanel.querySelector(".demo-block");
		if (internalWrapper) {
			internalWrapper.replaceWith(manualPreview);
		} else if (previewPanel) {
			previewPanel.appendChild(manualPreview);
		}
	} else if (preview && code) {
		// auto-extract from fenced block (HTML case)
		preview.innerHTML = code.textContent || "";
	}

	const setView = (view) => {
		controls.forEach((button) => {
			const isActive = button.dataset.view === view;
			button.classList.toggle("is-active", isActive);
			button.setAttribute("aria-selected", isActive ? "true" : "false");
		});

		panels.forEach((panel) => {
			panel.hidden = panel.dataset.panel !== view;
		});
	};

	controls.forEach((button) => {
		button.addEventListener("click", () => {
			setView(button.dataset.view);
		});
	});

	root.dataset.toggleReady = "true";
}

function initAllDemoToggles() {
	document.querySelectorAll(".demo-toggle").forEach((root) => {
		initDemoToggle(root);
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initAllDemoToggles, { once: true });
} else {
	initAllDemoToggles();
}
