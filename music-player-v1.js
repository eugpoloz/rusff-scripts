$(function() {
  $('.post-content').find('p').each(function() {
    $(this).html($(this).html().replace(/\[audio\]http:\/\/(?:prostopleer|pleer)\.com\/tracks\/((?:[^\]])+)\[\/audio\]/gi, '<embed src=\"http:\/\/embed.pleer.com\/small\/track?id=$1&t=grey\" type=\"application\/x-shockwave-flash\" style=\"width:445px;height:31px;\"><\/embed>')); /* Вставка музыки с pleer.com */
    $(this).html($(this).html().replace(/\[audio\]http:\/\/(?:prostopleer|pleer)\.com\/list((?:[^\]])+)\[\/audio\]/gi, '<embed src=\"http:\/\/embed.pleer.com\/list?id=$1\" type=\"application\/x-shockwave-flash\" style=\"width:550px;height:300px;\"><\/embed>')); /* Вставка плейлиста с pleer.com */
  });
});

$('td#button-code').after('<td id="button-audio" title="Музыка в посте"><img src="/i/blank.gif"></td>'); /* Функция на кнопке */
$('td#button-audio').click(function (event) {
    if (event.ctrlKey || event.altKey) {
        bbcode('[audio]', '[/audio]');
    } else {
        var audioMusicURL = prompt('Вставьте ссылку на трек или плейлист с сайта pleer.com или prostopleer.com', 'http://');
        if (audioMusicURL === null) {
            return;
        } else if (!audioMusicURL || audioMusicURL === 'http://') {
            alert('Вы не вставили ссылку!');
        } else {
            insert('[audio]' + audioMusicURL + '[/audio]');
        }
    }
});
