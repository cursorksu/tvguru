
function rmPop(className) {
  document.addEventListener('click', handler, false);

  function handler(e) {
    const self = e.target.closest(`.${className}`);

    const $popovers = $(`.${className}`);

    if (!self) {
      if (!$popovers.length > 0) 
        return;

      $popovers.each(function(){
        if ($(this).next().hasClass('in')) {
          $(this).popover('hide');
        }
      });
    }
  }
}

rmPop('js-answer-popover');
