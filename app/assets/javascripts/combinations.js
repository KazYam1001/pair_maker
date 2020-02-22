$(document).on('turbolinks:load', function() {

  const paddingRight = (val,char,n) => {
    for(; val.length < n; val+=char);
    return val;
  }

  const buildGroup = (group, pairs) => {
    let text = [ paddingRight(`【${group}】`, ' ', 30) + '\n' ]
    pairs.forEach(ele => {
      const last = ele[2] ? ` & ${ele[2]}` : '';
      const col = `${ele[0]} & ${ele[1]}${last}`;
      text.push(paddingRight(col, ' ', 25) + '\n')
    })
    return text;
  }

  const buildText = (groups) => {
    let left = []
    let right = []
    let text = ''
    for(let key of Object.keys(groups)) {
      if (key === 'A' || key === 'C' || key === 'E') {
        left = buildGroup(key, groups[key])
        left = left.map(ele =>{ return ele.replace(/\r?\n/g, '') })
      } else {
        right = buildGroup(key, groups[key])
        for(let i = 0; i < left.length; i++) {
          // 右にペアがあれば連結してtextに追加
          // 無ければ左のペアに改行を足してtextに追加
          text += right[i] ? left[i] + right[i] : left[i] + '\n'
        }
      }
    }
    return text
  }

  const addMember = (id, name, token)=> {
    const html = `<div class="p-member-name">
                    <p data-id="${id}">${name}</p>
                    <form class="button_to" method="post" action="/users/${id}?entry%3F=0" data-remote="true"><input type="hidden" name="_method" value="patch"><input class="js-remove c-btn c-btn--dark" type="submit" value="欠席"><input type="hidden" name="authenticity_token" value="${token}"></form>
                  </div>`;
    $('#left').append(html);
  }

  const addGuest = (name)=> {
    const html = `<div class="p-member-name">
                    <p>${name}</p>
                    <button class='js-remove-guest c-btn c-btn--dark'>欠席</button>
                  </div>`;
    $('#left').append(html);
  }

  const removeMember = (id, name, token)=> {
    const html = `<div class="p-member-name">
                    <p data-id="${id}">${name}</p>
                    <form class="button_to" method="post" action="/users/${id}?entry%3F=1" data-remote="true"><input type="hidden" name="_method" value="patch"><input class="js-add c-btn c-btn--light" type="submit" value="出席"><input type="hidden" name="authenticity_token" value="${token}"></form>
                  </div>`
    $('#center').append(html);

  }
  const token = $("input[name=authenticity_token]").val();

  $('#new_combination').on("ajax:success", (e) => {
    $('#textarea').val('');
    let text = '';
    const groups = e.detail[0]
    text += buildText(groups)
    $('#textarea').val(text);
  });

  $('#left').on('ajax:success', '.button_to', function() {
    const id = $(this).prev().data('id');
    const name = $(this).prev().text();
    removeMember(id, name, token);
    $(`input[data-for-combination=${id}]`).remove();
    $(this).parent().remove();
  });

  $('#center').on('ajax:success', '.button_to', function() {
    const name = $(this).prev().text();
    const id = $(this).prev().data('id');
    addMember(id, name, token);
    $('.js-submit-pair').before(`<input name="user_ids[]" value="${id}" data-for-combination="${id}" type="hidden">`);
    $(this).parent().remove();
  });

  $('#result').on('click', '.js-add-guest', function() {
    const name = $(this).prev().val();
    if (!name.trim()) {
      alert('ゲストの名前を入力して下さい');
      return;
    }
    addGuest(name);
    $('.js-submit-pair').before(`<input name="guest[]" value="${name}" data-for-combination="${name}" type="hidden">`);
    $(this).prev().val('');
  });

  $('#left').on('click', '.js-remove-guest', function() {
    const name = $(this).prev().text();
    $(`input[data-for-combination=${name}]`).remove();
    $(this).parent().remove();
  });

  $('#textarea').on('click', function(){
    this.select();
  })
});

