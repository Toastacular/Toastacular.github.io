// Mods for the game

function setupMods() {
	// Loop over all mods functions and call their initialisation function
	for (var m in window) {
		try {
		if (typeof window[m] == "function" && window.hasOwnProperty(m)) {
			if (window[m].name.indexOf("initialiseMod") != -1) window[m]();
		}
		} catch(e) {
			// do nothing
		}
	}
}
