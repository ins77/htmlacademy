function sendAjax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
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
  sendAjax('test.txt').then((xhr) => {
    container.innerText = xhr.responseText;
    return xhr;
  }).then((xhr) => {
    console.log('получен ответ от сервера', xhr.responseText);
  });
});
