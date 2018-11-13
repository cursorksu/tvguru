function pickEmoji(emojiSelector, areaSelector) {
  const emojis = document.querySelectorAll(emojiSelector);

  if (!emojis.length > 0)
    return;

  const area = document.querySelector(areaSelector);

  emojis.forEach(emo => emo.addEventListener('click', handler));

  function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();

        console.log({sel});
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
      console.log(myField.selectionStart || myField.selectionStart == '0');
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
    }
  }

  function handler(e) {
    const emoji = e.target;
    const emojiContent = emoji.innerText;

    insertAtCursor(area, emojiContent)
    // area.value += emojiContent;
  }
}

pickEmoji('.js-emoji', '.js-area');