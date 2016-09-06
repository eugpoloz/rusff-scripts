$(function() {
   /* ПОДСЧЕТ СИМВОЛОВ В ФОРМЕ ОТВЕТА */
   if ($('textarea#main-reply').length > 0) {
      $('p.areafield.required').after('<div id="charcounter">Символов в сообщении: <span class="charcount">0</span></div>');
      var lastValue = '';
      setInterval(function() {
         if ($('#main-reply').val().length != lastValue) {
            lastValue = $('#main-reply').val().length;
            $('.charcount').text(lastValue);
         }
      }, 100);
   } /* Конец скрипта */
});
