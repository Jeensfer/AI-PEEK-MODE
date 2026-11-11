// Opens (or reuses) one small popup window in the user's own Chrome profile,
// so Google sees the normal signed-in session.
const urlFor = (q) => "https://www.google.com/search?udm=50&q=" + encodeURIComponent(q);

chrome.runtime.onMessage.addListener((m) => {
  if (m.type !== "open") return;
  (async () => {
    const pos = { left: m.left, top: m.top, width: m.w, height: m.h, focused: true };
    const { win } = await chrome.storage.session.get("win");
    if (win) {
      try {
        const w = await chrome.windows.get(win, { populate: true });
        await chrome.windows.update(win, pos);
        await chrome.tabs.update(w.tabs[0].id, { url: urlFor(m.q) });
        return;
      } catch { /* window was closed; fall through and create a new one */ }
    }
    const w = await chrome.windows.create({ url: urlFor(m.q), type: "popup", ...pos });
    await chrome.storage.session.set({ win: w.id });
  })();
});

chrome.windows.onRemoved.addListener(async (id) => {
  const { win } = await chrome.storage.session.get("win");
  if (win === id) chrome.storage.session.remove("win");
});

// Optional "peek" behaviour: close the popup when you click back into another Chrome window.
chrome.windows.onFocusChanged.addListener(async (id) => {
  if (id === chrome.windows.WINDOW_ID_NONE) return;
  const { win } = await chrome.storage.session.get("win");
  if (!win || id === win) return;
  const { closeOnBlur } = await chrome.storage.local.get({ closeOnBlur: true });
  if (closeOnBlur) { chrome.windows.remove(win).catch(() => {}); chrome.storage.session.remove("win"); }
});
