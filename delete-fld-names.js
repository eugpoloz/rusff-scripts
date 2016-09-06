$(function() {
   /* УДАЛЕНИЕ НАЗВАНИЙ ДОПОЛНИТЕЛЬНЫХ ПОЛЕЙ ПРОФИЛЯ */
   $('.post-author').find('li').each(function() {
      var delNameOf = [1, 3];
      for (var i = 0; i != delNameOf.length; i++) {
         if ($(this).hasClass('pa-fld' + delNameOf[i])) {
            $(this).html($(this).html().replace(/^.*?\: /i, ''));
         }
      }
   }); /* Конец скрипта */
});
