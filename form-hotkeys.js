$(function() {
   /* НАСТРОЙКА КНОПОК В ФОРМЕ ОТВЕТА */
   $('td#button-link, td#button-hide, td#button-image, td#button-video').find('img').removeAttr('onclick').click(function(event) {
      var thisID = $(this).parent().attr('id').toString().toLowerCase().replace(/^button-(.*)/g, '$1');
      if (event.ctrlKey || event.altKey) {
         if ( thisID == 'image' ) {
             bbcode('[img]', '[/img]');
         } else if ( thisID == 'link' ) {
             bbcode('[url=""]', '[/url]');
         } else {
             bbcode('[' + thisID + ']', '[/' + thisID + ']');
         }
      } else {
         FORUM.get('editor.' + thisID + '.onclick()');
      }
   }); /* Конец скрипта */
});
