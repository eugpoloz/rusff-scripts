/* ЗАМЕНА МЕССЕДЖЕЙ */

if ( ($('#navpm').length > 0) && ($('#navpm').find('span').html() !== 'Сообщения') ) { 
    $('#navpm span').html(
        $('#navpm span').html().replace(/Сообщения\&nbsp\;\((.*)?\)/i, '$1')
    ).addClass('newmess').show();
}
