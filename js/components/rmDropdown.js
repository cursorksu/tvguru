import { isMobile } from './shared/isMobile';

function rmDropdown(dropSelector, btnSelector, areaSelector) {
  const drop = document.querySelector(dropSelector);

  if (!drop)
    return;

  if (isMobile) {
    rmDropDownContent();
    bindFocus();
  }

  function rmDropDownContent() {
    drop.parentNode.removeChild(drop);
  }

  function bindFocus() {
    const btn = document.querySelector(btnSelector);

    btn.addEventListener('click', handler);
  }

  function handler() {
    document.querySelector(areaSelector).focus();
  }
}

rmDropdown('.js-drop', '.js-dropdown-btn', '.js-area-focused');
