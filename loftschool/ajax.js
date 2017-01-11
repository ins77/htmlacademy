sendAjax.addEventListener('click', () => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'test.txt');
  xhr.addEventListener('load', () => {
    console.log('ответ получен!');
    container.innerText = xhr.response;
  });
  xhr.send();
});
