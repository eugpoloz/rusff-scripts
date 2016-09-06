$(function() {
    /* КЛИКАБЕЛЬНЫЕ НИКИ ГОСТЕЙ */
    var guestForum = 'Script Outline';
    if ( $('#pun-viewtopic').length > 0 && $('#pun-crumbs1').find('a:nth-of-type(2)').text() === guestForum ) {
        $('.post-author').find('.pa-author').each(function() {
            if ( !$(this).find('a').length ) {
               $(this).html( $(this).html().replace(/(<span class=\"acchide\">Автор\:&nbsp;<\/span>)(.*)/ig, '$1<a href=\"javascript:to\(\'$2\'\)\" rel=\"nofollow\">$2<\/a>') );
           }
        });
    } /* Конец скрипта */
});
