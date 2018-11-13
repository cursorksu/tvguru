import { copyHandler, makeAccent } from "./copyToClipboard";

function openPopover(selector) {
  const $popovers = $(selector);

  if (!$popovers.length > 0)
    return;
    
  $('body').popover({ selector: selector, trigger: 'click' });

  $popovers.each(function(e) {
    $(this).on('click', handler);
  });

  function handler(e) {
    e.preventDefault();

    $popovers.each(function(e) {
      $(this).popover('hide');
    });

    const $self = $(e.target);
    const content = $($self.data('popover-content')).html();
    const options = {
      placement: $self.data('placement'),
      content,
      html: true
    }

    $self.popover(options);
    copyHandler(e);
    makeAccent(e, '.js-review');
  }
}

openPopover('.js-popover');
