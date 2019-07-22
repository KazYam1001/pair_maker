$(document).on('turbolinks:load', function() {

  const appendPairs = (ele) => {
    const last = ele[2] ? ` & ${ele[2]}` : '';
    const html = document.createElement('p')
    html.textContent = `${ele[0]} & ${ele[1]}${last}`
    document.querySelector('#result').appendChild(html);
  }

  const addMember = (id, name)=> {
    const html = `<div class="name-set">
                    <p>${name}</p>
                    <p class="js-remove">欠席</p>
                    <input name="user_ids[]" value="${id}" type="hidden" id="user_ids">
                  </div>`
    $('#form').append(html);
  }

  const removeMember = (id, name)=> {
    const html = `<div class="name-set">
                    <p>${name}</p>
                    <p class="js-add">出席</p>
                  </div>`
    $('#center').append(html);

  }

  document.addEventListener("ajax:success", (e) => {
    e.detail[0].forEach(ele => {
      appendPairs(ele)
    });
  });

  $('#center').on('click', '.js-add', function() {
    const name = $(this).prev().text()
    const id = $(this).prev().data('id')
    addMember(id, name);
    $(this).parent().remove();
  });

  $('#form').on('click', '.js-remove', function() {
    const name = $(this).prev().text()
    const id = $(this).prev().data('id')
    removeMember(id, name);
    $(this).parent().remove();
  });
})

