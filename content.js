(() => {
  if (window.top !== window) return;

  let on = true, instant = false, host, btn, mx = 0, my = 0, msx = 0, msy = 0;

  const loadPrefs = () => chrome.storage.local.get({ enabled: true, instant: false }, (s) => {
    on = s.enabled; instant = s.instant;
    if (!on) hideBtn();
  });
  loadPrefs();
  chrome.storage.onChanged.addListener(loadPrefs);
  document.addEventListener("mousemove", (e) => { msx = e.screenX; msy = e.screenY; }, { passive: true });

  function openWindow(q, sx, sy) {
    const W = Math.min(540, screen.availWidth), H = Math.min(700, screen.availHeight);
    const aL = screen.availLeft || 0, aT = screen.availTop || 0;
    chrome.runtime.sendMessage({
      type: "open", q, w: W, h: H,
      left: Math.round(Math.max(aL, Math.min(sx + 16, aL + screen.availWidth - W))),
      top: Math.round(Math.max(aT, Math.min(sy + 16, aT + screen.availHeight - H))),
    });
  }

  function ensure() {
    if (btn) return;
    host = document.createElement("div");
    host.style.cssText = "all:initial;position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647";
    const root = host.attachShadow({ mode: "closed" });
    root.innerHTML = `<style>
      button{position:fixed;display:none;width:30px;height:30px;border-radius:50%;border:1px solid #0003;
      background:#fff;color:#000;box-shadow:0 2px 8px #0003;cursor:pointer;font-size:15px;padding:0}
      @media (prefers-color-scheme:dark){button{background:#25262b;color:#eee;border-color:#fff3}}
    </style><button title="AI Mode">🔍</button>`;
    btn = root.querySelector("button");
    btn.addEventListener("mousedown", (e) => e.preventDefault()); // keep the selection
    btn.addEventListener("click", (e) => {
      const q = getSelection().toString().trim();
      hideBtn();
      if (q) openWindow(q, e.screenX, e.screenY);
    });
    document.documentElement.appendChild(host);
  }

  function hideBtn() { if (btn) btn.style.display = "none"; }

  document.addEventListener("mouseup", (e) => {
    if (!on || (host && e.composedPath().includes(host))) return;
    setTimeout(() => {
      const q = getSelection().toString().trim();
      if (!q || q.length > 300) return hideBtn();
      if (instant) return openWindow(q, e.screenX, e.screenY);
      ensure();
      mx = e.clientX; my = e.clientY;
      btn.style.left = Math.min(mx + 8, innerWidth - 40) + "px";
      btn.style.top = Math.min(my + 12, innerHeight - 40) + "px";
      btn.style.display = "block";
    }, 10);
  }, true);

  document.addEventListener("mousedown", (e) => {
    if (host && e.composedPath().includes(host)) return;
    hideBtn();
  }, true);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideBtn();
    else if (on && e.altKey && e.code === "KeyS") {
      const q = getSelection().toString().trim();
      if (q) { e.preventDefault(); hideBtn(); openWindow(q, msx, msy); }
    }
  }, true);
})();
