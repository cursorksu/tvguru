import { isMobile } from './shared/isMobile';

function stateToggler(state, className, btnSelector) {
  const dropDown = document.querySelector(`.${className}`);

  if (!dropDown)
    return;

  const btn = dropDown.querySelector(btnSelector);

  if (!isMobile) {
    dropDown.addEventListener('click', openHandler);
  }

  function openHandler(e) {
    btn.classList.add(state)
    dropDown.classList.add(state);
  }

  function closeHandler() {
    btn.classList.remove(state)
    dropDown.classList.remove(state);
  } 

  document.querySelector('body').addEventListener('click', function(e) {
    if (!e.target.closest(`.${className}`) && !e.target.classList.contains('js-area'))
      closeHandler();
  });
}

stateToggler('is-open', 'js-dropdown', '.js-dropdown-btn');
