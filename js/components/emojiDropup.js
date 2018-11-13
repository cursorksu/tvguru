

function emojiDropup(options) {
  $(document).foundation({
    dropdown: options
  });
}


const dropupOptions = {
  active_class: 'is-open',
  align: 'bottom',
  // is_hover: true,
  hover_timeout: 5000
}

emojiDropup(dropupOptions);
