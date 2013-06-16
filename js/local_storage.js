
	function save(key, value) {
		//chrome.storage.local.set({key: value});
		localStorage.setItem(key, value);
	}

	function get(key) {
		return localStorage.getItem(key);
	}		

	function clear() {
		localStorage.clear();
	}