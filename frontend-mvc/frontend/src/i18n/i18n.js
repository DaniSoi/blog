import * as language from "./lang-config.js";

// (function () {
  function initText () {
    const elements = document.querySelectorAll("[recipes-i18n]");

    const replaceText = (el) => {
      const key = el.getAttribute('recipes-i18n');
      el.innerText = language.englishConfig[key] || key;
    };

    elements.forEach(el => replaceText(el));
  }

  window.addEventListener('load', initText);
// })();
