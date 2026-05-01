const translations = {
  en: {
    telegram_dm: "Telegram DM",
    telegram_channel: "Telegram Channel",
    youtube: "YouTube",
    tiktok: "TikTok",
    steam: "Steam",
    github: "GitHub",
    discord: "Discord",
    xbox: "Xbox",
    open: "open",
    copy: "copy",
    copied: "copied",
    footer: "— abassini-company (c) copyright",
  },
  ru: {
    telegram_dm: "Telegram ЛС",
    telegram_channel: "Telegram Канал",
    youtube: "YouTube",
    tiktok: "TikTok",
    steam: "Steam",
    github: "GitHub",
    discord: "Discord",
    xbox: "Xbox",
    open: "открыть",
    copy: "копировать",
    copied: "скопировано",
    footer: "— abassini-company (c) copyright",
  },
};

let currentLang = localStorage.getItem("lang") || "en";

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

document.querySelectorAll(".lang-switch button").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLang(btn.dataset.lang);
  });
});

applyLang(currentLang);

// Copy logic
document.querySelectorAll("[data-copy]").forEach((el) => {
  el.addEventListener("click", async () => {
    const value = el.dataset.copy;
    const badge = el.querySelector(".action-badge");

    try {
      await navigator.clipboard.writeText(value);
      badge.textContent = translations[currentLang].copied;
      el.classList.add("copied");

      setTimeout(() => {
        badge.textContent = translations[currentLang].copy;
        el.classList.remove("copied");
      }, 1800);
    } catch {
      badge.textContent = "error";
    }
  });
});
