function prevent(selector) {
  const links = document.querySelectorAll(selector);

  if (!links.length > 0)
    return;

  links.forEach(link => link.addEventListener('click', handler));

  function handler(e) {
    e.preventDefault();
  }

}

prevent('.js-prevent');