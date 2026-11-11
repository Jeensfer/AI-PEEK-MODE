const defaults = { enabled: true, instant: false, closeOnBlur: true };
chrome.storage.local.get(defaults, (s) =>
  Object.keys(defaults).forEach((k) => (document.getElementById(k).checked = s[k])));
Object.keys(defaults).forEach((k) =>
  document.getElementById(k).addEventListener("change", (e) =>
    chrome.storage.local.set({ [k]: e.target.checked })));
