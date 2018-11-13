
const copy = str => {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';                 
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =            
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
};

function copyToClipBoard(btnSelector) {
  const shares = document.querySelectorAll(btnSelector);
  
  if (!shares.length > 0)
    return;

  shares.forEach(share => {
    share.addEventListener('click', function(e){
      handler(e);
    });
  });

  function handler(e) {
    const current = e.target;
    const href    = current.getAttribute('href');

    copy(href);
  }
}

function copyHandler(e) {
  const current = e.target;
  const href    = current.getAttribute('href');

  copy(href);
}

function makeAccent(e, selector) {
  const current = e.target;
  const item = current.closest(selector);

  const items = document.querySelectorAll(selector);

  if (item.classList.contains('item-review')) {
    items.forEach(item => {
      item.classList.remove('review-focused');
    });
    if (item) {
      item.classList.add('review-focused');
    }
    
  } else {
      items.forEach(item => {
        item.classList.remove('u-has-accent');
      });
      if (item) {
        item.classList.add('u-has-accent');
      }
  }
}

export { copyToClipBoard, copyHandler, makeAccent };
