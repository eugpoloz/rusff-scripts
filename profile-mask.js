$(function() {
   /* ДЕФОЛТНАЯ АВАТАРКА */
   $('#pun-viewtopic, #pun-messages').find('.post-author').each(function () {
       if ( !($(this).find('.pa-avatar.item2').length > 0) ) {
            $(this).find('.pa-author').before(function () {
                return '<li class="pa-avatar item2"><img title="guest icon" class="guest icon" src="http://co.forum4.ru/files/0017/3c/7c/37303.png"></li>';
            });
       }
   }); /* Конец скрипта */

  $('.post-content').find('p').each(function() {
    /* МАСКА ПРОФИЛЯ, ЧАСТЬ 1 */
    $(this).html( $(this).html().replace(/\[(icon|sign|nick|status)\]((?:[^\[])+)\[\/(?:icon|sign|nick|status)\]/igm, '<span class="changeMask $1">$2<\/span>')); /* Смена аватара, никнейма, статуса и подписи */
    $('.changeMask.icon, .changeMask.sign, .changeMask.status, .changeMask.nick').hide(); /* Удалить потом */
  });

  /* ИНИЦИАЛИЗАЦИЯ МАСКИ */
  profileMasking();
});

/* ЗАМЕНА АВАТАРА И МАСКА ПРОФИЛЯ, ОСНОВНАЯ ЧАСТЬ */
var profileMasking = function() {
  var forumCheck = $('#pun-crumbs1').find('a:nth-of-type(2)').text(),
    profileMask = ['Writers\' Room', 'Main Cast & Crew', 'Table Reads', 'Sketch! Camera! Action!', 'B-Roll Footage', 'Pick-Ups & Re-Shoots', 'Final Cut', 'Wrap Party', 'Off the Set', 'Deleted Scenes'],
    profileMaskFull = ['Writers\' Room', 'Sketch! Camera! Action!', 'B-Roll Footage', 'Pick-Ups & Re-Shoots', 'Final Cut', 'Deleted Scenes'],
    viewtopic = /http\:\/\/(?:.*)viewtopic.php\?id\=((?:[^\&|\#| ])+).*/gi;

  if ($('#pun-viewtopic, #pun-edit, #pun-post').length > 0) {
    for (var maskIndex = 0, profileMaskLen = profileMask.length; profileMaskLen > maskIndex; ++maskIndex) {
      if (forumCheck === profileMask[maskIndex]) {
        $('td#button-addition').after('<td id="button-changeProfile" title="Маска профиля для поста"><img src="/i/blank.gif"></td>');
        $('#form-buttons').after('<div class="container" id="changeProfile-area" style="width: 430px;"><div class="chIcon"> <span>Ссылка на аватар:</span> <span class="input"><input type="text" id="chIcon-text" placeholder="http://"></span> </div><div class="maskButtons"> <span class="chOkay"><a>ОК, готово!</a></span>&nbsp;&nbsp;&nbsp;<span><a onclick="$(\'#changeProfile-area\').find(\'input, textarea\').val(\'\');">Очистить всё</a></span>&nbsp;&nbsp;&nbsp;<span><a onclick="$(\'#changeProfile-area\').hide(); return false;">Закрыть окно</a></span> </div></div>');
        if ($('#pun-viewtopic, #pun-edit').length > 0) {
          letsChangeIcon();
        }
        for (var maskFullIndex = 0, maskFullLen = profileMaskFull.length; maskFullLen > maskFullIndex; ++maskFullIndex) {
          if (forumCheck === profileMaskFull[maskFullIndex]) {
            letsChangeStuff();
            if (!($('#changeProfile-area').find('.maskWrapper').length)) {
              maskMenuFull();
            }
          }
          var topicType = location.href.toString().replace(/http\:\/\/(?:.*)\/(.*)/gi, '$1'),
            topicID,
            storedIcon = 'topic' + topicID + 'icon',
            storedNick = 'topic' + topicID + 'nick',
            storedStatus = 'topic' + topicID + 'status',
            storedSign = 'topic' + topicID + 'sign';
          if ($('#changeProfile-area').length > 0) {
            if ((/viewtopic|post.php?tid/gi).test(topicType)) {
              topicID = location.href.toString().replace(viewtopic, '$1');
              loadLocalStor(storedIcon, storedNick, storedStatus, storedSign);
            } else if ((/edit/gi).test(topicType)) {
              topicID = $('#pun-crumbs1').find('a:nth-of-type(3)').attr('href').replace(viewtopic, '$1');
              loadLocalStor(storedIcon, storedNick, storedStatus, storedSign);
            }
          }
        }
        $('.post-content').find('.changeMask').empty();
        break;
      }
    }
  }

  function maskMenuFull() {
    var nickVal = '<div class="chNick"> <span>Никнейм:</span> <span class="input"><input type="text" id="chNick-text" placeholder="Name Surname" maxlength="25"></span></div>',
      statusVal = '<div class="chStatus"> <span>Статус:</span> <span class="input"><input type="text" id="chStatus-text" placeholder="Текст статуса" maxlength="50"></span> </div>',
      signVal = '<div class="chSign"> <span>Подпись:<br><i class="small-text">(Работают все BB-коды, кроме кодов таблицы.)</i></span> <div class="resizable-textarea"><textarea id="chSign-text" rows="3" class="processed"></textarea></div></div>';
    $('#changeProfile-area').find('.chIcon').after('<div class="maskWrapper-button"><span>Добавить маску</span> </div><div class="maskWrapper" style="display: none;">' + nickVal + statusVal + signVal + '</div>');
    $('#changeProfile-area').find('.chOkay').after('&nbsp;&nbsp;&nbsp;<span class="chBBcode"><a onclick="insert(\'[icon][/icon][nick][/nick][status][/status][sign][/sign]\')">Вставить BB-код маски</a></span>');
  }

  function loadLocalStor(icon, nick, status, sign) {
    $('#changeProfile-area').find('#chIcon-text').val(localStorage.icon);
    $('#changeProfile-area').find('#chNick-text').val(localStorage.nick);
    $('#changeProfile-area').find('#chStatus-text').val(localStorage.status);
    $('#changeProfile-area').find('#chSign-text').val(localStorage.sign);
  }

  function letsChangeIcon() {
    $('.post-content').find('.changeMask').each(function() {
      var post = $(this).closest('.post'),
        postAuthor = post.find('.post-author'),
        postAuthorNick = postAuthor.find('.pa-author a').html();
      if (post.find('.changeMask.icon').length > 0) {
        if (postAuthor.find('.pa-avatar.item2').length > 0) {
          postAuthor.find('.pa-avatar.item2').html('<img title="changed icon"  class="changed icon" src="' + post.find('.changeMask.icon').text() + '">');
        } else {
          postAuthor.find('.pa-author').before('<li class="pa-avatar item2"><img title="changed icon" class="changed icon" src="' + post.find('.changeMask.icon').text() + '"></li>');
        }
      }
    });
  }

  function letsChangeStuff() {
    $('.post-content').find('.changeMask').each(function() {
      var $change = $(this);
      letsChangeEverything($change);
    });
  }

  function letsChangeEverything($changer) {
    var post = $changer.closest('.post'),
      postAuthor = post.find('.post-author');
    if (post.find('.changeMask.sign').length > 0) {
      if (post.find('.post-sig').length > 0) {
        post.find('.post-sig').find('dd').html('<p>' + post.find('.changeMask.sign').html() + '</p>');
      } else {
        post.find('.post-content').after('<dl class="post-sig"><dt></dt><dd><p>' + post.find('.changeMask.sign').html() + '</p></dd></dl>');
      }
      post.find('.changeMask.sign').find('img').attr('class', 'sigimage');
    }
    if (post.find('.changeMask.status').length > 0) {
      postAuthor.find('.pa-title').html(post.find('.changeMask.status').html());
    }
    if (post.find('.changeMask.nick').length > 0) {
      postAuthor.find('.pa-author a').html(post.find('.changeMask.nick').html());
      postAuthor.find('.pa-fld1 div').first().addClass('masked-char').hide();
      postAuthor.find('.pa-fld2, .pa-fld3').hide();
    }
  }

  $('<span class="masked-char-button">Персонаж под маской</span>').insertBefore('.masked-char');
  $('.masked-char-button').attr('cursor', 'pointer').click( function() {
  	$(this).siblings('.masked-char').slideToggle('slow');
  });

  $('td#button-changeProfile').click(function(event) {
    if (event.ctrlKey || event.altKey) {
      bbcode('[icon]', '[/icon]');
    } else {
      $('#changeProfile-area').toggle();
    }
  });

  $('#changeProfile-area').find('.maskWrapper-button span').click(function() {
    var $maskWrapper = $('#changeProfile-area').find('.maskWrapper');
    $maskWrapper.toggle();
    if ($maskWrapper.css('display') == 'block') {
      $(this).text('Закрыть поле редактирования маски');
    } else {
      $(this).text('Добавить маску');
    }
  });

  $('#changeProfile-area').find('.chOkay').click(function() {
    $('#changeProfile-area').find('input, textarea').each(function() {
      var classID = $(this).attr('id'),
        classCode = classID.toString().toLowerCase().replace(/^ch(.*)-text/g, '$1'),
        whatChanges = $(this).val(),
        viewtopic = /http\:\/\/(?:.*)viewtopic.php\?id\=((?:[^\&|\#| ])+).*/gi;

      var topicType = location.href.toString().replace(/http\:\/\/(?:.*)\/(.*)/gi, '$1'),
        topicID = location.href.toString().replace(viewtopic, '$1'),
        storeKey = 'topic' + topicID + classCode;

      if ((/viewtopic|post.php?tid/gi).test(topicType)) {
        localStorage.removeItem(storeKey);
      } else if ((/edit/gi).test(topicType)) {
        var storeEditKey = 'topic' + $('#pun-crumbs1').find('a:nth-of-type(3)').attr('href').replace(viewtopic, '$1') + classCode;
        localStorage.removeItem(storeEditKey);
      }

      if (whatChanges.length > 0) {
        if (classID == 'chIcon-text') {
          if (!(/\.(gif|jpg|jpeg|png|gif\?dl\=0|jpg\?dl\=0|jpeg\?dl\=0|png\?dl\=0|gif\?dl\=1|jpg\?dl\=1|jpeg\?dl\=1|png\?dl\=1)$/i).test(whatChanges)) {
            alert('Вы вставили ссылку не на картинку!');
          } else {
            insert('[' + classCode + ']' + whatChanges + '[/' + classCode + ']');
          }
        } else {
          insert('[' + classCode + ']' + whatChanges + '[/' + classCode + ']');
        }

        if ((/viewtopic|post.php?tid/gi).test(topicType)) {
          localStorage.setItem(storeKey, whatChanges);
        } else if ((/edit/gi).test(topicType)) {
          localStorage.setItem(storeEditKey, whatChanges);
        }

      }
      $('#changeProfile-area').toggle();
    });
  });

  $('#changeProfile-area').find('input, textarea').each(function() {
    $(this).parent().siblings('span').click(function(e) {
      var classCode = $(this).siblings().find('input, textarea').attr('id').toString().toLowerCase().replace(/^ch(.*)-text/g, '$1');
      if (e.ctrlKey || e.altKey) {
        bbcode('[' + classCode + ']', '[/' + classCode + ']');
      } else {
        return false;
      }
    });
  });

};
