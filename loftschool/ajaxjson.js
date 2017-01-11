function sendAjax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      resolve(xhr); // можем передать только один аргумент
    });
    xhr.addEventListener('error', () => {
      reject();
    });
    xhr.send();
  });
}

myButton.addEventListener('click', () => {
  sendAjax('cities.json').then((xhr) => {
    // let data = JSON.parse(xhr.responseText);
    // console.log(xhr.response); // за счет xhr.responseType = 'json'; выведет массив; responseText выдает текст, когда устанавливаем responseType обращаемся к response
    for({name} of xhr.response) {
      let div = document.createElement('div');
      div.innerText = name;
      container.appendChild(div);
    }
    return xhr;
  }).then((xhr) => {
    console.log('получен ответ от сервера', xhr.response);
  });
});
