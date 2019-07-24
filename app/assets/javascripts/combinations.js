$(document).on('turbolinks:load', function() {

  const buildText = (ele) => {
    const last = ele[2] ? ` & ${ele[2]}` : '';
    const text = `${ele[0]} & ${ele[1]}${last}\n`;
    return text;
  }

  const addMember = (id, name)=> {
    let input = ''
    if (id) {
      input = `<input name="user_ids[]" value="${id}" type="hidden"></input>`;
    }else{
      input = `<input name="guest[]" value="${name}" type="hidden"></input>`;
    }
    const html = `<div class="name-set">
                    <p data-id='${id}'>${name}</p>
                    <p class="js-remove">欠席</p>
                    ${input}
                  </div>`;
    $("input[type=submit]").before(html);
  }

  const removeMember = (id, name)=> {
    const html = `<div class="name-set">
                    <p data-id='${id}'>${name}</p>
                    <p class="js-add">出席</p>
                  </div>`
    $('#center').append(html);

  }

  $(document).on("ajax:success", (e) => {
    console.log( e.detail[0].absence )

    if (e.detail[0].absence == 'true') {
      console.log('T')
    }else if (e.detail[0].absence == 'false'){
      console.log('F')
    }else{
      console.log('P')
      $('#textarea').val('');
      let text = '';
      e.detail[0].forEach(ele => {
        text += buildText(ele);
      });
      $('#textarea').val(text);
    }
  });

  $('#center').on('click', '.js-add', function() {
    const name = $(this).prev().text()
    const id = $(this).prev().data('id')
    addMember(id, name);
    $(this).parent().remove();
  });

  $('#result').on('click', '.js-add-guest', function() {
    const name = $(this).prev().val();
    addMember(null, name);
    $(this).prev().val('');
  });

  $('#form').on('click', '.js-remove', function() {
    const id = $(this).prev().data('id')
    if (id == null) {
      $(this).parent().remove();
      return;
    }
    const name = $(this).prev().text()
    removeMember(id, name);
    $(this).parent().remove();
  });
})

