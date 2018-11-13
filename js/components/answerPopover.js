import { widthInfo } from './shared/widthInfo'


function answerPopover(selector) {
  const $answerPopovers = $(selector);

  if (!$answerPopovers.length > 0) 
    return;

  $('body').popover({selector, trigger: 'click'});

  $answerPopovers.each(function(e) {
    $(this).on('click', handler);
  });

  function handler(e) {
    e.preventDefault();
    $answerPopovers.each(function(e) {
      $(this).popover('hide');
    });

    const $self      = $(e.target).closest(selector);
    const dataNumber = $self.data('people');
    const dataText   = $self.data('popover-text');
    const placement  = widthInfo() >= 1026 ? $self.data('placement') : 'left';
    const content = `${dataNumber} ${dataText}`;

    const cssStyles = widthInfo() >= 1026 ? {marginLeft: '-10px'} : {left: 'unset', right: '58px'};
    const options = {
      content,
      trigger: 'click',
      placement,
      offset: '100px'
    }

    $self.popover(options);
    
    $self.on('show.bs.popover', function() {
      setTimeout(function() {
        const $pop = $self.siblings('.popover');
        $pop.css(cssStyles);
      }, 100);
    });
  }
}

answerPopover('.js-answer-popover');
