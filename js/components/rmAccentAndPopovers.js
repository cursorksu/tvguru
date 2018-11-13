const POPOVER_CLASS_NAME = 'js-popover';

function rmAccentAndPopovers(reviewsSelector, dateClassName) {
  document.addEventListener('click', handler, false);
  
  function handler(e) {
    if (!e.target.classList.contains(dateClassName) && !e.target.classList.contains(POPOVER_CLASS_NAME)) {
      const $popovers = $(`.${POPOVER_CLASS_NAME}`);
      const $reviews  = $(reviewsSelector);
      
      $popovers.each(function(){
        if ($(this).next().hasClass('in')) {
          $(this).popover('hide');
        }
      });

      $popovers.popover('hide');

      $reviews.each(function () {
        if ($(this).hasClass('review-focused')) {
          $(this).removeClass('review-focused');
        } else if ($(this).hasClass('u-has-accent')) {
          $(this).removeClass('u-has-accent');
        }
      })
    } 
  }
}

rmAccentAndPopovers('.js-popover, .js-review', 'js-date');
