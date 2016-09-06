/* СТАВИТЬ В HTML В ФОРМЕ ОТВЕТА */
$(function() {
    if ( $('#post').length > 0 ) {
        $('#post').find('p.formsubmit').append('<div id="submitpostfast">Для быстрой отправки сообщения нажмите <span>CTRL+Enter.<\/span><\/div>');
    }
});
document.onkeydown = function(event) {
    if ((event.keyCode == 13) && (event.ctrlKey)) {
        $('#post').find('input[name="submit"]').click();
        $('#post').find('textarea[name=req_message]').val('');
    }
};
