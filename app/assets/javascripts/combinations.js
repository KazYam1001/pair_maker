$(document).on('turbolinks:load', function() {

  const buildText = (ele) => {
    const last = ele[2] ? ` & ${ele[2]}` : '';
    const text = `${ele[0]} & ${ele[1]}${last}\n`;
    return text;
  }

  const addMember = (id, name, token)=> {
    const html = `<div class="name-set">
                    <p data-id="${id}">${name}</p>
                    <form class="button_to" method="post" action="/users/${id}?entry%3F=0" data-remote="true"><input type="hidden" name="_method" value="patch"><input class="js-remove" type="submit" value="欠席"><input type="hidden" name="authenticity_token" value="${token}"></form>
                  </div>`;
    $('#left').append(html);
  }

  const addGuest = (name)=> {
    const html = `<div class="name-set">
                    <p>${name}</p>
                    <button class='js-remove-guest'>欠席</button>
                  </div>`;
    $('#left').append(html);
  }

  const removeMember = (id, name, token)=> {
    const html = `<div class="name-set">
                    <p data-id="${id}">${name}</p>
                    <form class="button_to" method="post" action="/users/${id}?entry%3F=1" data-remote="true"><input type="hidden" name="_method" value="patch"><input class="js-add" type="submit" value="出席"><input type="hidden" name="authenticity_token" value="${token}"></form>
                  </div>`
    $('#center').append(html);

  }
  const token = $("input[name=authenticity_token]").val();

  $('#new_combination').on("ajax:success", (e) => {
    $('#textarea').val('');
    let text = '';
    e.detail[0].forEach(ele => {
      text += buildText(ele);
    });
    $('#textarea').val(text);
  });

  $('#left').on('ajax:success', '.button_to', function() {
    const id = $(this).prev().data('id')
    const name = $(this).prev().text()
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
    addGuest(name);
    $('.js-submit-pair').before(`<input name="guest[]" value="${name}" data-for-combination="${name}" type="hidden">`);
    $(this).prev().val('');
  });

  $('#left').on('click', '.js-remove-guest', function() {
    console.log(1)
    const name = $(this).prev().text();
    $(`input[data-for-combination=${name}]`).remove();
    $(this).parent().remove();
  });
})

