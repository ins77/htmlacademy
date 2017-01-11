// promise waterfall - для загрузки массива из неизвестного количества картинок

let url1 = 'http://www.zooclub.ru/skat/img.php?w=700&h=700&img=./attach/7328.jpg';
let url2 = 'https://cs7052.vk.me/c540107/v540107359/2729/fYQlS_23QdA.jpg';
let url3 = 'http://minionomaniya.ru/wp-content/uploads/2016/01/%D0%BC%D0%B8%D0%BD%D1%8C%D0%BE%D0%BD%D1%8B-%D0%BF%D1%80%D0%B8%D0%BA%D0%BE%D0%BB%D1%8B-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8.jpg';

let loadImage = (url) => {
  // pending - ожидание
  // fulfilled/resolved - выполнено успешно
  // rejected - выполнено с ошибкой
  return new Promise((resolve, reject) => {
    let image = new Image();
    document.body.appendChild(image);
    image.src = url;
    image.addEventListener('load', () => {
      resolve();
    });
    image.addEventListener('error', () => {
      reject();
    });
  });
};

let promise = loadImage(url1);

promise.then(
  () => {
    console.log('картинка 1 загружена успешно');
    return loadImage(url2);
  },
  () => {
    console.log('картинка 1 загружена с ошибкой');
  }
).then(
  () => {
    console.log('картинка 2 загружена успешно');
    return loadImage(url3);
  },
  () => {
    console.log('картинка 2 загружена с ошибкой');
  }
).then(
  () => {
    console.log('картинка 3 загружена успешно');
  },
  () => {
    console.log('картинка 3 загружена с ошибкой');
  }
);
