<?php

$pages[1] = (object) array(
  'href' => '/newsitem', 
  'title' => 'News item — font size bigger', 
  'path' => '/views/page_news_item.php', 
  'status' => (object) array(
    '1' => 'deprecated'
  ),
  'task' => null
);

$pages[2] = (object) array(
  'href' => '/previewitem', 
  'title' => '[Статья. Деталка] Указать партнёрские материалы, Баннер-предупреждение о cookie, [Подвал] Поправить элементы', 
  'path' => '/views/page_preview_item.php', 
  'status' => (object) array(
    '3' => 'archived',
  ),
  'task' => (object) array(
    'Указать партнёрские материалы' => 'https://trello.com/c/0ZWIzKm0/124',
    'Баннер-предупреждение о cookie' => 'https://trello.com/c/hliFA0pc/126',
    'Поправить элементы' => 'https://trello.com/c/giXBbwJe/123',
  )
);

$pages[3] = (object) array(
  'href' => '/serialsitem', 
  'title' => '[Коллекции] Вывести баннер на Фукси', 
  'path' => '/views/page_new_serials.php', 
  'status' => (object) array(
    '3' => 'archived',
  ),
  'task' => (object) array(
    'Вывести баннер на Фукси' => 'https://trello.com/c/YjCzAYKf/121'
  )
);

$pages[4] = (object) array(
  'href' => '/privacy-policy', 
  'title' => 'Сверстать страницы с юр информацией', 
  'path' => '/views/page_privacy_policy.php', 
  'status' => (object) array(
    // '1' => 'done',
    '2' => 'deprecated'
  ),
  'task' => (object) array(
    'страницы с юр информацией' => 'https://trello.com/c/VXcmq5ia/127'
  )
);

$pages[5] = (object) array(
  'href' => '/privacy-policy-news-typography', 
  'title' => 'Сверстать страницы с юр информацией — типографика с //tvguru.ru/new-series/4602-the-terror/', 
  'path' => '/views/typography_from_news.php', 
  'status' => (object) array(
    '3' => 'archived',
  ),
  'task' => (object) array(
    'страницы с юр информацией' => 'https://trello.com/c/VXcmq5ia/127'
  )
);

$pages[6] = (object) array(
  'href' => '/component-comments', 
  'title' => '[Деталка] Поправить комментарии', 
  'path' => '/views/component_comments.php', 
  'status' => (object) array(
    '1' => 'deprecated',
  ),
  'task' => (object) array(
    '[Деталка] Поправить комментарии' => 'https://trello.com/c/fyzjS4NZ/118'
  )
);

$pages[7] = (object) array(
  'href' => '/about-us', 
  'title' => 'Сверстать страницы «О нас»', 
  'path' => '/views/page_about_us.php', 
  'status' => (object) array(
    '3' => 'archived',
  ),
  'task' => (object) array(
    'Сверстать страницы «О нас» и «Контакты»' => 'https://trello.com/c/ITTD32e5/128'
  )
);

$pages[8] = (object) array(
  'href' => '/contacts', 
  'title' => 'Сверстать страницы «Контакты»', 
  'path' => '/views/page_contacts.php', 
  'status' => (object) array(
    '3' => 'archived',
  ),
  'task' => (object) array(
    'Сверстать страницы «О нас» и «Контакты»' => 'https://trello.com/c/ITTD32e5/128'
  )
);

$pages[9] = (object) array(
  'href' => '/votes', 
  'title' => '[Комменты и отзывы] Сделать ссылку на дате', 
  'path' => '/views/page_comments.php', 
  'status' => (object) array(
    '1' => 'done',
    '2' => 'need-approval'
  ),
  'task' => (object) array(
    '[Комменты и отзывы] Сделать ссылку на дате' => 'https://trello.com/c/bcgFjS5Y/90'
  )
);

$pages[10] = (object) array(
  'href' => '/comments', 
  'title' => '[Комменты] Сделать ссылку на дате', 
  'path' => '/views/page_news_item.php', 
  'status' => (object) array(
    '1' => 'done',
    '2' => 'need-approval'
  ),
  'task' => (object) array(
    '[Комменты] Сделать ссылку на дате' => 'https://trello.com/c/bcgFjS5Y/90'
  )
);

// $pages[11] = (object) array(
//   'href' => '/emoji-modal', 
//   'title' => '[Комментарии] Нужно добавить смайлики и модалку для картинок (foundation-hover dropdown)', 
//   'path' => '/views/emoji_modal.php', 
//   'status' => (object) array(
//     '1' => 'done',
//     '2' => 'need-approval'
//   ),
//   'task' => (object) array(
//     '[Комментарии] Нужно добавить смайлики и модалку для картинок' => 'https://trello.com/c/DrsEcFGY/84'
//   )
// );

$pages[12] = (object) array(
  'href' => '/emoji-dropdown', 
  'title' => 'Example of normal yandex music iframe looking. [Комментарии] Нужно добавить смайлики и модалку для картинок (custom dropdown), [Деталка] Поправить комментарии', 
  'path' => '/views/emoji_dropdown.php', 
  'status' => (object) array(
    '1' => 'done',
    '2' => 'need-approval'
  ),
  'task' => (object) array(
    '[Комментарии] Нужно добавить смайлики и модалку для картинок' => 'https://trello.com/c/DrsEcFGY/84',
    '[Деталка] Поправить комментарии' => 'https://trello.com/c/fyzjS4NZ/118',
  )
);

$pages = array_reverse($pages);
