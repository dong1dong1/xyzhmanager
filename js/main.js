// alert('gggggg');
$(function () {
  // alert('vvvvv');
  $('.list-table .status').click(function () {

    alert('状态设置'); //使用逻辑代码替换

    if ($(this).hasClass('off')) {
      // alert('登录11');
      $(this).removeClass('off');
      $(this).addClass('on');
    } else {
      $(this).removeClass('on');
      $(this).addClass('off');
    }


    // console.log('gggg');
  });


  $('.xz-body-search-btn').click(function () {

    if ($('#xz-body-search-keyword').val() == '') {
      alert('请填写搜索词');
      return;
    }

    alert('搜索'); //使用逻辑代码替换

    // console.log('gggg');
  });

  $('#file1upload').click(function () {

    alert('上传'); //使用逻辑代码替换

    // console.log('gggg');
  });

  $('#file2upload').click(function () {

    alert('上传2'); //使用逻辑代码替换

    // console.log('gggg');
  });

  $('.xz-header-search a').click(function () {

    alert('课程搜索'); //使用逻辑代码替换

    // console.log('gggg');
  });

  $('.xz-header-logout').click(function () {

    alert('登出'); //使用逻辑代码替换

    // console.log('gggg');
  });

  $('.login-form-btn').click(function () {



    if ($('#username').val() == '') {
      alert('请填写员工编号');
      return;
    }

    if ($('#password').val() == '') {
      alert('请填写密码');
      return;
    }

    alert('登录'); //使用逻辑代码替换

    // console.log('gggg');
  });

  $('.train-edit .edit-table-bottom input:nth-child(1)').click(function () {

    alert('显示/隐藏'); //使用逻辑代码替换

  });

  $('.train-edit .edit-table-bottom input:nth-child(2)').click(function () {

    if ($('#title').val() == '') {
      alert('请填写培训名称');
      return;
    }


    alert('保存'); //使用逻辑代码替换

  });

  $('.train-create .edit-table-bottom input:nth-child(1)').click(function () {

    if ($('#title').val() == '') {
      alert('请填写培训名称');
      return;
    }


    var lesson_checked = '';

    $('.lesson-list-checked>div').each(function () {
      var lessonid = $(this).attr('lesson-id');
      lesson_checked = lesson_checked + lessonid + ',';

    });

    if (lesson_checked == '') {
      alert('请选择签到课程');
      return;
    }

    alert('签到课程ID：' + lesson_checked);

    alert('发布'); //使用逻辑代码替换

  });

  $('.train-create .edit-table-bottom input:nth-child(2)').click(function () {

    if ($('#title').val() == '') {
      alert('请填写培训名称');
      return;
    }


    var lesson_checked = '';

    $('.lesson-list-checked>div').each(function () {
      var lessonid = $(this).attr('lesson-id');
      lesson_checked = lesson_checked + lessonid + ',';

    });

    if (lesson_checked == '') {
      alert('请选择签到课程');
      return;
    }

    alert('签到课程ID：' + lesson_checked);


    alert('保存'); //使用逻辑代码替换

  });

  //列表頁頂部導航效果
  $('.list-tag .train-layer-1 li').mouseover(function () {

    // alert($(this).attr('data-id'));

    if ($(this).attr('data-id')) {
      $(this).siblings('li').removeClass('checked');
      $('.list-tag .train-layer-2 ul').removeClass('checked');

      if ($('.list-tag .train-layer-2 ul[layer-data-id=' + $(this).attr('data-id') + ']').length > 0) {
        $(this).addClass('checked');
        $('.list-tag .train-layer-2 ul[layer-data-id=' + $(this).attr('data-id') + ']').addClass('checked');
      }
      // console.log($('.list-tag .train-layer-2 ul[layer-data-id='+$(this).attr('data-id')+']'));
      // console.log($('.list-tag .train-layer-2 ul[layer-data-id='+$(this).attr('data-id')+']').length);

    } else {
      $(this).siblings('li').removeClass('checked');
      $('.list-tag .train-layer-2 ul').removeClass('checked');
    }

    // alert('保存'); //使用逻辑代码替换

  });

  //列表頁頂部導航效果
  $('.list-tag .train-layer').mouseout(function () {

    // alert($(this).attr('data-id'));

    $('.list-tag .train-layer-1 li').removeClass('checked');
    $('.list-tag .train-layer-2 ul').removeClass('checked');


    // alert('保存'); //使用逻辑代码替换

  });

  $('.list-tag .train-layer-2 ul').mouseover(function () {
    $(this).addClass('checked');
    $('.list-tag .train-layer-1 li[data-id=' + $(this).attr('layer-data-id') + ']').addClass('checked');
  });

  $('.list-tag .train-layer-2 ul').mouseout(function () {
    $('.list-tag .train-layer-1 li').removeClass('checked');
    $('.list-tag .train-layer-2 ul').removeClass('checked');
  });

  $('.list-table .all-check-btn').click(function () {
    // $('.list-table input[checkbox]').attr('checked');
    if ($(this).hasClass('checked')) {
      // $('.list-table input[name="checkbox"]').removeAttr('checked');

      // $('.list-table input[name="checkbox"]').
      $('input:checkbox').attr('checked', ''); //or
      $('input:checkbox').attr('checked', false);

      $(this).removeClass('checked');
    } else {
      // $('.list-table input[name="checkbox"]').attr('checked','true');

      $('input:checkbox').attr('checked', 'checked'); //or
      $('input:checkbox').attr('checked', true);

      $(this).addClass('checked');
    }




    // $('.list-tag .train-layer-2 ul').removeClass('checked');
  });

  $('.type-list .list-item').click(function () {
    // $('.list-table input[checkbox]').attr('checked');
    if ($(this).hasClass('checked')) {
      // $('.list-table input[name="checkbox"]').removeAttr('checked');

      // $('.list-table input[name="checkbox"]').
      $('input:checkbox').attr('checked', ''); //or
      $('input:checkbox').attr('checked', false);

      $(this).removeClass('checked');
    } else {
      // $('.list-table input[name="checkbox"]').attr('checked','true');

      $('.type-list .list-item.checked').removeClass('checked');

      $(this).addClass('checked');
    }




    // $('.list-tag .train-layer-2 ul').removeClass('checked');
  });


  $('.train-create .lesson-list>div').click(function () {

    if ($(this).hasClass('checked')) {
      // is checked

    } else {
      var lessonid = $(this).attr('lesson-id');

      var lessonname = $(this).text();

      if ($('.lesson-list-checked div[lesson-id=' + lessonid + ']').length > 0) {
        // $(this).addClass('checked');
        // $('.list-tag .train-layer-2 ul[layer-data-id='+$(this).attr('data-id')+']').addClass('checked');
      } else {
        var itemhtml = '<div lesson-id="' + lessonid + '">' + lessonname + '<div></div></div>';

        $('.lesson-list-checked').append(itemhtml);

        $(this).addClass('checked');

      }


    }
    // $('.list-table input[checkbox]').attr('checked');



    // alert('fff');
    // if($(this).hasClass('checked'))
    // {
    //   // $('.list-table input[name="checkbox"]').removeAttr('checked');

    //   // $('.list-table input[name="checkbox"]').
    //   $('input:checkbox').attr('checked', '');//or
    //   $('input:checkbox').attr('checked', false);

    //   $(this).removeClass('checked');
    // }else{


    //   $('.type-list .list-item.checked').removeClass('checked');

    //   $(this).addClass('checked');
    // }

    // $('.list-tag .train-layer-2 ul').removeClass('checked');

    // $(this).parent().remove();



  });

  $('.train-create').on('click', '.lesson-list-checked>div>div', function () {
    // $('.list-table input[checkbox]').attr('checked');
    // alert($(this));

    $(this).parent().remove();

    var lessonid = $(this).parent().attr('lesson-id');

    if ($('.lesson-list div[lesson-id=' + lessonid + ']').length > 0) {
      $('.lesson-list div[lesson-id=' + lessonid + ']').removeClass('checked');
      // $('.list-tag .train-layer-2 ul[layer-data-id='+$(this).attr('data-id')+']').addClass('checked');
    }


  });

  $('.train-create .lesson-keyvalue>div').click(function () {
    // alert($(this).parent);

    $('.train-create .lesson-list').toggle();

  });


  // $('.train-create #keyword').input(function() {
  //   alert($(this));
  // });

  $('.train-create #keyword').on('input', function () {

    console.log($(this).val());

    if (!($(this).val() == '')) {
      var keystr = $(this).val();
      //  $(".cancle_ico").removeClass('hide');

      $('.lesson-list>div').each(function () {
        var lessonname = $(this).text();
        if (lessonname.indexOf(keystr) > -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
      $('.train-create .lesson-list').show();
    } else {
      //  $(".cancle_ico").addClass('hide');
      $('.train-create .lesson-list').hide();
    }

  });

});
