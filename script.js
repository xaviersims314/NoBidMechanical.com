// ===== Random Theme + Dark/Light System Preference + Buttons =====
(function() {
  const THEMES = ["ftcc","ecu","ncsu"];
  const picked = THEMES[Math.floor(Math.random() * THEMES.length)];
  document.documentElement.classList.add(picked);

  const savedMode = localStorage.getItem("nbm-mode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyMode(mode) {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    updateButtons(mode);
  }

  function updateButtons(mode) {
    const bLight = document.getElementById("btnLight");
    const bDark  = document.getElementById("btnDark");
    if (mode === "dark") {
      bDark.classList.add("active");
      bLight.classList.remove("active");
    } else {
      bLight.classList.add("active");
      bDark.classList.remove("active");
    }
  }

  if (savedMode) {
    applyMode(savedMode);
  } else {
    applyMode(prefersDark ? "dark" : "light");
  }

  document.getElementById("btnLight").addEventListener("click", function(){
    localStorage.setItem("nbm-mode","light");
    applyMode("light");
  });
  document.getElementById("btnDark").addEventListener("click", function(){
    localStorage.setItem("nbm-mode","dark");
    applyMode("dark");
  });

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      if (!localStorage.getItem("nbm-mode")) {
        applyMode(e.matches ? "dark" : "light");
      }
    });
  }
})();