$(function() {
  let chatMemberAddList = $("#UserSearchResult");
  let chatMemberRemoveList = $(".ChatMembers");
  function addUser(user) {
    let html = 
    `<div class="ChatMember clearfix">
      <p class="ChatMember__name">${user.name}</p>
      <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`;
  chatMemberAddList.append(html);
  }
  function addNoUser() {
    let html = 
    `<div class="ChatMember clearfix">
      <p class="ChatMember__name">ユーザーが見つかりません</p>
    </div>`;
    chatMemberAddList.append(html);
  }
  function addMember(name, id) {
    let html = 
      `<div class="ChatMember">
        <p class="ChatMember__name">${name}</p>
        <input name="group[user_ids][]" type="hidden" value="${id}" />
        <div class="ChatMember__remove ChatMember__button">削除</div>
      </div>`
    chatMemberRemoveList.append(html);
  }
  $('#UserSearch__field').on("keyup", function () {
    let input = $('#UserSearch__field').val();
    $.ajax({
      type: "GET",    //HTTPメソッド
      url: '/users',       //users_controllerの、indexアクションにリクエストの送信先を設定する
      data: { keyword: input },   //テキストフィールドに入力された文字を設定する
      dataType: 'json'
    })
    .done(function (users) {
      //emptyメソッドで一度検索結果を空にする
      chatMemberAddList.empty();
      //usersが空かどうかで条件分岐
      if (users.length !== 0) {
        //配列オブジェクト１つ１つに対する処理
        users.forEach(function (user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function () {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  })
    // 追加ボタンが押された時にイベントが発火
    chatMemberAddList.on("click", ".ChatMember__add", function () {
      const userName = $(this).attr("data-user-name");
      const userId = $(this).attr("data-user-id");
      $(this).parent().remove();
      addMember(userName, userId);
    });

    chatMemberRemoveList.on("click", ".ChatMember__remove", function () {
      console.log(this);
      $(this).parent().remove();
    });
})